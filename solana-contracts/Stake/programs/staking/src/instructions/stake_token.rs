use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, TokenAccount, Transfer},
};
use solana_program::{program::{invoke, invoke_signed}, program_pack::Pack, system_instruction};

use crate::{constants::*, errors::*, states::*, utils::*};

use raydium_amm::instruction::{deposit};


#[derive(Accounts)]
#[instruction(
    card_no: u8,
    token_amount: u64,
)]
pub struct StakeToken<'info> {
    #[account(mut)]
    user: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump,
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        mut,
        seeds = [STAKE_STATE_SEED, token_mint.key().as_ref(), [card_no].as_ref()],
        bump
    )]
    pub stake_state: Box<Account<'info, StakeState>>,

    #[account(
        init_if_needed,
        seeds = [USER_STATE_SEED, user.key().as_ref(), token_mint.key().as_ref(), [card_no].as_ref()],
        bump,
        payer = user,
        space = 8 + std::mem::size_of::<UserState>(),
    )]
    pub user_state: Box<Account<'info, UserState>>,

    #[account(mut, constraint = user_vault.owner == user.key())]
    pub user_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub token_mint: Account<'info, token::Mint>,

    #[account(mut, constraint = token_vault.owner == global_state.key())]
    pub token_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = quote_vault.owner == global_state.key())]
    pub quote_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = lp_vault.owner == global_state.key())]
    pub lp_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = treasury_vault.owner == global_state.treasury)]
    pub treasury_vault: Box<Account<'info, TokenAccount>>,
    
    #[account(mut)]
    pub referrer_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub raydium_amm_program: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub amm_pool: AccountInfo<'info>,

    /// CHECK: raydium will check
    pub amm_authority: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub amm_open_orders: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub amm_target_orders: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub amm_lp_mint: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub amm_coin_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub amm_pc_vault: Box<Account<'info, TokenAccount>>,

    /// CHECK: raydium will check
    pub market: AccountInfo<'info>,

    /// CHECK: raydium will check
    pub market_event_queue: AccountInfo<'info>,

    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

pub fn stake_token(ctx: Context<StakeToken>, card_no: u8, token_amount: u64) -> Result<()> {
    let accts = ctx.accounts;
    let global_state = &accts.global_state;
    let stake_state = &mut accts.stake_state;
    let user_state = &mut accts.user_state;
    let token_index;

    token_index = find_index(&global_state.whitelisted_tokens, accts.token_mint.key()).unwrap();
    require!(token_index == stake_state.token_index as usize, StakingError::NotWhitelistedToken);

    require!(
        stake_state.is_initialized == 1,
        StakingError::NotStarted
    );

    let cur_timestamp = u64::try_from(Clock::get()?.unix_timestamp).unwrap();

    require!(usize::from(card_no) < STAKE_COUNT, StakingError::InvalidPool);
    // decimals
    require!(
        token_amount >= MIN_STAKE_AMOUNTS[token_index][card_no as usize],
        StakingError::InvalidAmount
    );

    let stake_fee = stake_fee(&global_state, token_amount)?;
    let referral_fee = ref_fee(&global_state, token_amount)?;
    let real_amount = token_amount - stake_fee - referral_fee;
    msg!("real_amount: {}", real_amount);

    let bump = ctx.bumps.global_state;
    let global_state_seed: &[&[&[u8]]] = &[&[&GLOBAL_STATE_SEED, &[bump]]];

    if token_index == 1 {
        // Send MPAD token to contract
        let cpi_accounts = Transfer {
            from: accts.user_vault.to_account_info(),
            to: accts.token_vault.to_account_info(),
            authority: accts.user.to_account_info(),
        };
        let cpi_program = accts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, real_amount)?;
    } else {
        if token_index == 0 {
            /* Convert SOL to WSOL */
            msg!(
                "Sol Balance1: {}, {}",
                accts.user.to_account_info().lamports(),
                accts.user_vault.to_account_info().lamports()
            );

            // Send SOL: user -> user_vault for WSOL
            invoke(
                &system_instruction::transfer(
                    &accts.user.key(),
                    &accts.user_vault.key(),
                    real_amount
                ),
                &[
                    accts.user.to_account_info().clone(),
                    accts.user_vault.to_account_info().clone(),
                    accts.system_program.to_account_info().clone()
                ]
            )?;

            // Sync the native token to reflect the new SOL balance as WSOL
            let cpi_accounts = token::SyncNative {
                account: accts.user_vault.to_account_info(),
            };
            let cpi_program = accts.token_program.to_account_info();
            let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
            token::sync_native(cpi_ctx)?;

            msg!(
                "Sol Balance2: {}, {}",
                accts.user.to_account_info().lamports(),
                accts.user_vault.to_account_info().lamports()
            );
        }

        // // transfer tokens from user_vault to token_vault
        let cpi_accounts1 = Transfer {
            from: accts.user_vault.to_account_info(),
            to: accts.token_vault.to_account_info(),
            authority: accts.user.to_account_info(),
        };
        let cpi_program1 = accts.token_program.to_account_info();
        let cpi_ctx1 = CpiContext::new(cpi_program1, cpi_accounts1);
        token::transfer(cpi_ctx1, real_amount)?;

        
        let base_side; // 0: base coin; 1: base pc
        let base_vault;
        let quote_vault;
        let base_amount;
        let quote_amount;

        if token_index == 0 {
            base_side = 1;
            base_vault = accts.quote_vault.clone();
            quote_vault = accts.token_vault.clone();
            base_amount = accts.quote_vault.amount;
            quote_amount = real_amount;
        } else {
            base_side = 0;
            base_vault = accts.token_vault.clone();
            quote_vault = accts.quote_vault.clone();
            base_amount = real_amount;
            quote_amount = accts.quote_vault.amount;
        }

        let lp_mint: spl_token::state::Mint = spl_token::state::Mint::unpack(&accts.amm_lp_mint.data.borrow()).unwrap();
        let old_lp_amount = lp_mint.supply;
        // msg!("lp_mint.supply: {}", lp_mint.supply);

        // Add liquidity to Raydium pool
        let inst = deposit(
            &accts.raydium_amm_program.key(),
            &accts.amm_pool.key(),
            &accts.amm_authority.key(),
            &accts.amm_open_orders.key(),
            &accts.amm_target_orders.key(),
            &accts.amm_lp_mint.key(),
            &accts.amm_coin_vault.key(),
            &accts.amm_pc_vault.key(),
            
            &accts.market.key(),
            &accts.market_event_queue.key(),

            &base_vault.key(),
            &quote_vault.key(),
            &accts.lp_vault.key(),
            &global_state.key(),

            base_amount,
            quote_amount, // MPAD amount
            base_side
        )?;

        let account_info_vec = vec![
            // spl & sys
            accts.token_program.to_account_info(),
            // amm
            accts.amm_pool.to_account_info(),
            accts.amm_authority.to_account_info(),
            accts.amm_open_orders.to_account_info(),
            accts.amm_target_orders.to_account_info(),
            accts.amm_lp_mint.to_account_info(),
            accts.amm_coin_vault.to_account_info(),
            accts.amm_pc_vault.to_account_info(),
            // market
            accts.market.to_account_info(),
            // user
            base_vault.to_account_info(),
            quote_vault.to_account_info(),
            accts.lp_vault.to_account_info(),
            global_state.to_account_info(),

            accts.market_event_queue.to_account_info()
        ];
        
        invoke_signed(&inst, &account_info_vec, global_state_seed)?;

        // calculate lp addend
        let lp_mint: spl_token::state::Mint = spl_token::state::Mint::unpack(&accts.amm_lp_mint.data.borrow()).unwrap();
        msg!("lp_addend: {}", lp_mint.supply - old_lp_amount);
        user_state.lp_amount += lp_mint.supply - old_lp_amount;
        msg!("user_state.lp_amount: {}", user_state.lp_amount);
    }

    // Send token to treasury
    if token_index == 0 {
        invoke(
            &system_instruction::transfer(
                &accts.user.key(),
                &accts.treasury_vault.key(),
                stake_fee
            ),
            &[
                accts.user.to_account_info().clone(),
                accts.treasury_vault.to_account_info().clone(),
                accts.system_program.to_account_info().clone()
            ]
        )?;

        invoke(
            &system_instruction::transfer(
                &accts.user.key(),
                &accts.referrer_vault.key(),
                stake_fee
            ),
            &[
                accts.user.to_account_info().clone(),
                accts.referrer_vault.to_account_info().clone(),
                accts.system_program.to_account_info().clone()
            ]
        )?;
    } else {
        let cpi_accounts2 = Transfer {
            from: accts.user_vault.to_account_info(),
            to: accts.treasury_vault.to_account_info(),
            authority: accts.user.to_account_info(),
        };
        let cpi_program2 = accts.token_program.to_account_info();
        let cpi_ctx2 = CpiContext::new(cpi_program2, cpi_accounts2);
        token::transfer(cpi_ctx2, stake_fee)?;
        
        // Send token to referrer
        let cpi_accounts3 = Transfer {
            from: accts.user_vault.to_account_info(),
            to: accts.referrer_vault.to_account_info(),
            authority: accts.user.to_account_info(),
        };
        let cpi_program3 = accts.token_program.to_account_info();
        let cpi_ctx3 = CpiContext::new(cpi_program3, cpi_accounts3);
        token::transfer(cpi_ctx3, referral_fee)?;
    }

    user_state.token_index = token_index as u8;
    user_state.card_no = card_no;
    user_state.stake_amount = user_state.stake_amount + real_amount;
    user_state.stake_time = cur_timestamp;
    user_state.claim_time = cur_timestamp;

    stake_state.total_staked = stake_state.total_staked + real_amount;

    Ok(())
}
