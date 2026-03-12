use anchor_lang::prelude::*;
use solana_program::{system_instruction, program::{invoke_signed}};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, TokenAccount, Transfer, CloseAccount},
};

use crate::{constants::*, errors::*, states::*, utils::*};

use raydium_amm::instruction::{withdraw};


#[derive(Accounts)]
#[instruction(
    card_no: u8
)]
pub struct WithdrawToken<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump,
      )]
    pub global_state: Box<Account<'info, GlobalState>>,

    #[account(
        mut,
        seeds = [STAKE_STATE_SEED, token_mint.key().as_ref(), [card_no].as_ref()],
        bump
    )]
    pub stake_state: Box<Account<'info, StakeState>>,

    #[account(
        mut,
        seeds = [USER_STATE_SEED, user.key().as_ref(), token_mint.key().as_ref(), [card_no].as_ref()],
        bump,
    )]
    pub user_state: Box<Account<'info, UserState>>,

    #[account(mut, constraint = user_vault.owner == user.key())]
    pub user_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    // constraint = user_token_coin.owner == authority.key()
    /// CHECK: raydium will check
    pub user_quote_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    token_mint: Box<Account<'info, token::Mint>>,

    #[account(mut, constraint = token_vault.owner == global_state.key())]
    pub token_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = quote_vault.owner == global_state.key())]
    pub quote_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = lp_vault.owner == global_state.key())]
    pub lp_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = treasury_vault.owner == global_state.treasury)]
    pub treasury_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = treasury_vault.owner == global_state.treasury)]
    pub treasury_quote_vault: Box<Account<'info, TokenAccount>>,

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
    pub amm_coin_vault: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub amm_pc_vault: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub market_program: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub market: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub market_coin_vault: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub market_pc_vault: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub market_vault_signer: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub market_event_queue: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub market_bids: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub market_asks: AccountInfo<'info>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

pub fn unstake_token(ctx: Context<WithdrawToken>, card_no: u8) -> Result<()> {
    let accts = ctx.accounts;
    let global_state = &mut accts.global_state;
    let stake_state = &mut accts.stake_state;
    let user_state = &mut accts.user_state;
    let token_index;

    token_index = find_index(&global_state.whitelisted_tokens, accts.token_mint.key()).unwrap();
    require!(token_index == stake_state.token_index as usize, StakingError::NotWhitelistedToken);

    require!(
        stake_state.is_initialized == 1,
        StakingError::NotStarted
    );

    require!(
        user_state.stake_amount > 0,
        StakingError::InsufficientClaimableAmount
    );

    // let cur_timestamp = Clock::get()?.unix_timestamp as u64;
    // require!(cur_timestamp > user_state.stake_time + STAKE_PERIODS[card_no as usize], StakingError::NotEndedYet);

    let mut unstake_amount = user_state.stake_amount;
    let fee_unstake = unstake_fee(&global_state, unstake_amount)?;
    unstake_amount = unstake_amount - fee_unstake;

    let mut reward_amount = calc_rewards(&user_state, token_index as u8, card_no)?;
    let fee_reward = unstake_fee(&global_state, reward_amount)?;
    reward_amount = reward_amount - fee_reward;

    // Send Token
    let bump = ctx.bumps.global_state;
    let global_state_seed: &[&[&[u8]]] = &[&[&GLOBAL_STATE_SEED, &[bump]]];

    if token_index == 1 {
        require!(accts.quote_vault.amount >= unstake_amount + fee_unstake + reward_amount + fee_reward, 
            StakingError::InsufficientQuoteTokenAmount);

        let cpi_accounts = Transfer {
            from: accts.token_vault.to_account_info(),
            to: accts.user_vault.to_account_info(),
            authority: global_state.to_account_info(),
        };
    
        let cpi_program = accts.token_program.to_account_info();
        let cpi_ctx: CpiContext<Transfer> = CpiContext::new_with_signer(cpi_program, cpi_accounts, global_state_seed);
    
        token::transfer(cpi_ctx, unstake_amount + reward_amount)?;
    } else {
        if token_index != 0 {
            require!(accts.token_vault.amount >= unstake_amount + fee_unstake, StakingError::InsufficientTokenAmount);
        }
        require!(accts.quote_vault.amount >= reward_amount + fee_reward, StakingError::InsufficientQuoteTokenAmount);

        let base_vault;
        let quote_vault;

        if token_index == 0 {
            base_vault = accts.quote_vault.clone();
            quote_vault = accts.token_vault.clone();
        } else {
            base_vault = accts.token_vault.clone();
            quote_vault = accts.quote_vault.clone();
        }

        // Remove liquidity from Raydium pool
        let inst = withdraw(
            &accts.raydium_amm_program.key(),
            &accts.amm_pool.key(),
            &accts.amm_authority.key(),
            &accts.amm_open_orders.key(),
            &accts.amm_target_orders.key(),
            &accts.amm_lp_mint.key(),
            &accts.amm_coin_vault.key(),
            &accts.amm_pc_vault.key(),
            
            &accts.market_program.key(),
            &accts.market.key(),
            &accts.market_coin_vault.key(),
            &accts.market_pc_vault.key(),
            &accts.market_vault_signer.key(),

            &accts.lp_vault.key(),
            &base_vault.key(),
            &quote_vault.key(),
            &global_state.clone().key(),

            &accts.market_event_queue.key(),
            &accts.market_bids.key(),
            &accts.market_asks.key(),

            None,

            user_state.lp_amount
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
            accts.market_program.to_account_info(),
            accts.market.to_account_info(),
            accts.market_coin_vault.to_account_info(),
            accts.market_pc_vault.to_account_info(),
            accts.market_vault_signer.to_account_info(),
            // user
            accts.lp_vault.to_account_info(),
            base_vault.to_account_info(),
            quote_vault.to_account_info(),
            global_state.to_account_info(),

            accts.market_event_queue.to_account_info(),
            accts.market_bids.to_account_info(),
            accts.market_asks.to_account_info()
        ];
        
        invoke_signed(&inst, &account_info_vec, global_state_seed)?;

        if token_index == 0 {
            /* Convert WSOL to SOL */
            // msg!(
            //     "Sol Balance1: {}, {}",
            //     accts.token_vault.to_account_info().lamports(),
            //     global_state.to_account_info().lamports()
            // );

            // Close the account to reflect the new SOL balance
            let cpi_accounts = CloseAccount {
                account: accts.token_vault.to_account_info(),
                authority: global_state.to_account_info(),
                destination: global_state.to_account_info().clone(),
            };
            token::close_account(CpiContext::new_with_signer(
                accts.system_program.to_account_info().clone(), cpi_accounts, global_state_seed
            ))?;

            // msg!(
            //     "Sol Balance2: {}, {}",
            //     accts.token_vault.to_account_info().lamports(),
            //     global_state.to_account_info().lamports()
            // );
        }

        if token_index == 0 {
            msg!(
                "Sol Balance: {}, {}",
                global_state.to_account_info().lamports(), 
                unstake_amount
            );

            invoke_signed(
                &system_instruction::transfer(
                    &accts.token_vault.key(),
                    &accts.user.key(),
                    unstake_amount
                ),
                &[
                    accts.token_vault.to_account_info().clone(),
                    accts.user.to_account_info().clone(),
                    accts.system_program.to_account_info().clone()
                ],
                global_state_seed
            )?;
        } else {
            // send unstake amount of tokens
            let cpi_accounts1 = Transfer {
                from: accts.token_vault.to_account_info(),
                to: accts.user_vault.to_account_info(),
                authority: global_state.to_account_info(),
            };

            let cpi_program1 = accts.token_program.to_account_info();
            let cpi_ctx1 = CpiContext::new_with_signer(cpi_program1, cpi_accounts1, global_state_seed);

            let _= token::transfer(cpi_ctx1, unstake_amount);
        }

        
        // send rewards
        let cpi_accounts11 = Transfer {
            from: accts.quote_vault.to_account_info(),
            to: accts.user_quote_vault.to_account_info(),
            authority: global_state.to_account_info(),
        };

        let cpi_program11 = accts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program11, cpi_accounts11, global_state_seed);

        let _= token::transfer(cpi_ctx, reward_amount);
    }

    // Send withdraw fee
    if token_index == 0 {
        invoke_signed(
            &system_instruction::transfer(
                &accts.token_vault.key(),
                &accts.treasury_vault.key(),
                fee_unstake
            ),
            &[
                accts.token_vault.to_account_info().clone(),
                accts.treasury_vault.to_account_info().clone(),
                accts.system_program.to_account_info().clone()
            ],
            global_state_seed
        )?;
    } else {
        let cpi_accounts2 = Transfer {
            from: accts.token_vault.to_account_info(),
            to: accts.treasury_vault.to_account_info(),
            authority: global_state.to_account_info(),
        };
    
        let cpi_program2 = accts.token_program.to_account_info();
        let cpi_ctx2: CpiContext<Transfer> = CpiContext::new_with_signer(cpi_program2, cpi_accounts2, global_state_seed);
    
        token::transfer(cpi_ctx2, fee_unstake)?;
    }

    
    // // Send reward fee
    // let cpi_accounts3 = Transfer {
    //     from: accts.quote_vault.to_account_info(),
    //     to: accts.treasury_quote_vault.to_account_info(),
    //     authority: global_state.to_account_info(),
    // };

    // let cpi_program3 = accts.token_program.to_account_info();
    // let cpi_ctx3: CpiContext<Transfer> = CpiContext::new_with_signer(cpi_program3, cpi_accounts3, global_state_seed);

    // token::transfer(cpi_ctx3, fee_reward)?;

    // msg!("Successfully withdrew: {}", unstake_amount);

    // stake_state.total_staked = stake_state.total_staked - user_state.stake_amount;
    
    // user_state.stake_amount = 0;

    Ok(())
}
