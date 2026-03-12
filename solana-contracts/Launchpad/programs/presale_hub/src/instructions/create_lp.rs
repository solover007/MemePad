use anchor_lang::prelude::*;

use solana_program::{
    native_token::LAMPORTS_PER_SOL,
    program::{invoke, invoke_signed},
    system_instruction,
};

use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Burn, Mint, TokenAccount, Transfer, transfer},
};

use raydium_amm::instruction::initialize2;

use crate::{constants::*, errors::*, states::*, utils::*};

#[derive(Accounts)]
#[instruction(
    quote_token_id: u8,
    nonce: u8,
    open_time: u64,
)]
pub struct CreateLP<'info> {
    pub authority: Signer<'info>,

    #[account(mut)]
    pub token_mint: Box<Account<'info, token::Mint>>,

    #[account(mut, constraint = token_vault.owner == presale_state.key())]
    pub token_vault: Box<Account<'info, token::TokenAccount>>, // Presale Base token ATA

    #[account(
        mut,
        associated_token::mint = presale_state.whitelisted_tokens[quote_token_id as usize],
        associated_token::authority = presale_state,
    )]
    pub presale_whitelisted_token_account: Box<Account<'info, token::TokenAccount>>, // Presale QuoteToken ATA

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump
    )]
    pub global_state: Box<Account<'info, GlobalState>>,

    #[account(
        mut,
        seeds = [PRESALE_STATE_SEED, token_mint.key().as_ref()],
        bump
    )]
    pub presale_state: Box<Account<'info, PresaleState>>,

    #[account(
        mut,
        seeds = [VAULT_SEED, presale_state.key().as_ref()],
        bump
    )]
    pub vault: AccountInfo<'info>,

    #[account(mut, address = global_state.treasury)]
    /// CHECK: this should be checked with address in global_state
    pub treasury: AccountInfo<'info>,
    
    #[account(
        mut,
        associated_token::mint = presale_state.whitelisted_tokens[quote_token_id as usize],
        associated_token::authority = treasury,
    )]
    pub treasury_whitelisted_token_account: Box<Account<'info, TokenAccount>>,
    
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
    pub amm_lp_mint: AccountInfo<'info>,

    /// CHECK: raydium will check
    pub amm_coin_mint: AccountInfo<'info>,

    /// CHECK: raydium will check
    pub amm_pc_mint: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub amm_coin_vault: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub amm_pc_vault: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub amm_target_orders: AccountInfo<'info>,

    /// CHECK: raydium will check
    pub amm_config: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: raydium will check
    pub create_fee_destination: AccountInfo<'info>,

    /// CHECK: raydium will check
    pub market_program: AccountInfo<'info>,

    /// CHECK: raydium will check
    pub market: AccountInfo<'info>,

    #[account(mut)]
    // constraint = user_token_coin.owner == authority.key()
    /// CHECK: raydium will check
    pub user_token_coin: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    // constraint = user_token_pc.owner == authority.key()
    /// CHECK: raydium will check
    pub user_token_pc: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    // constraint = user_token_lp.owner == authority.key()
    /// CHECK: raydium will check
    pub user_token_lp: AccountInfo<'info>,

    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

pub fn create_lp(
    ctx: Context<CreateLP>,
    quote_token_id: u8,
    nonce: u8,
    open_time: u64,
) -> Result<()> {
    let accts = ctx.accounts;
    let presale_state = &mut accts.presale_state;

    let cur_timestamp = u64::try_from(Clock::get()?.unix_timestamp).unwrap();

    require!(
        presale_state.authority == accts.authority.key() || accts.global_state.authority == accts.authority.key(),
        PresaleError::Unauthorized
    );
    require!(
        presale_state.state == 1,
        PresaleError::AlreadyFinalized
    );
    require!(
        cur_timestamp > presale_state.end_time,
        PresaleError::NotEndedYet
    );
    require!(
        presale_state.softcap_amount <= presale_state.quote_token_amount[quote_token_id as usize],
        PresaleError::NotReachedAtSoftCap
    );
    require!(
        presale_state.lp_created[quote_token_id as usize] == 0,
        PresaleError::LPAlreadyCreated
    );

    // BaseToken
    // let amt: u64 = accts.token_vault.amount;
    let decimals = accts.token_mint.decimals;

    let pad_fee_amount = (presale_state.quote_token_amount[quote_token_id as usize] as u128)
        .checked_mul(presale_state.pad_fee_pct as u128)
        .unwrap()
        .checked_div(DENOMINATOR as u128)
        .unwrap() as u64;

    let rest_quote_amount = presale_state.quote_token_amount[quote_token_id as usize] - pad_fee_amount;

    let init_pc_amount = (rest_quote_amount as u128)
        .checked_mul(presale_state.lp_percent as u128)
        .unwrap()
        .checked_div(DENOMINATOR as u128)
        .unwrap() as u64;

    msg!("sol amount for lp: {}", init_pc_amount);

    let init_coin_amount: u64;
    
    if quote_token_id == 0 {
        init_coin_amount = (init_pc_amount as u128)
            .checked_mul(presale_state.listing_price as u128)
            .unwrap()
            .checked_div(LAMPORTS_PER_SOL as u128)
            .unwrap()
            .checked_div(DENOMINATOR as u128)
            .unwrap()
            .checked_mul(10_i32.pow(decimals as u32) as u128)
            .unwrap() as u64;
    } else {
        let sol_amount_for_quote = quote_to_sol(presale_state, quote_token_id, init_pc_amount as u128)?;
        init_coin_amount = (sol_amount_for_quote as u128)
            .checked_mul(presale_state.listing_price as u128)
            .unwrap()
            .checked_div(LAMPORTS_PER_SOL as u128)
            .unwrap()
            .checked_div(DENOMINATOR as u128)
            .unwrap()
            .checked_mul(10_i32.pow(decimals as u32) as u128)
            .unwrap() as u64;
    }

    let bump = ctx.bumps.vault;
    let presale_key = presale_state.key();
    let vault_seed: &[&[&[u8]]] = &[&[VAULT_SEED, presale_key.as_ref(), &[bump]]];

    let bump2 = ctx.bumps.presale_state;
    let token_mint_key = accts.token_mint.key();
    let presale_state_seed: &[&[&[u8]]] =
        &[&[&PRESALE_STATE_SEED, token_mint_key.as_ref(), &[bump2]]];

    // Pad Fee
    if quote_token_id == 0 {
        // Send Sol: presale vault -> Treasury
        invoke_signed(
            &system_instruction::transfer(&accts.vault.key(), &accts.treasury.key(), pad_fee_amount),
            &[
                accts.vault.to_account_info().clone(),
                accts.treasury.clone(),
                accts.system_program.to_account_info().clone(),
            ],
            vault_seed,
        )?;
    } else {
        // Transfer Quote token -> Treasury
        let cpi_accounts = Transfer {
            from: accts.presale_whitelisted_token_account.to_account_info(),
            to: accts.treasury_whitelisted_token_account.to_account_info(),
            authority: presale_state.to_account_info(),
        };

        let cpi_program = accts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, presale_state_seed);
        
        transfer(cpi_ctx, pad_fee_amount)?;
    }
 

    if presale_state.is_auto_listing {
        if quote_token_id == 0 { // Wrap SOL
            // Send Sol: presale vault -> quote token vault for wrap SOL
            invoke_signed(
                &system_instruction::transfer(
                    &accts.vault.key(),
                    &accts.presale_whitelisted_token_account.key(),
                    init_pc_amount,
                ),
                &[
                    accts.vault.to_account_info().clone(),
                    accts.presale_whitelisted_token_account.to_account_info().clone(),
                    accts.system_program.to_account_info().clone(),
                ],
                vault_seed,
            )?;

            msg!(
                "Sol Balance before wrap: {}, {}",
                accts.vault.to_account_info().lamports(),
                accts.presale_whitelisted_token_account.to_account_info().lamports()
            );

            // Sync the native token to reflect the new SOL balance as wSOL
            let cpi_accounts = token::SyncNative {
                account: accts.presale_whitelisted_token_account.to_account_info(),
            };
            let cpi_program = accts.token_program.to_account_info();
            let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
            token::sync_native(cpi_ctx)?;

            msg!(
                "Sol Balance after wrap: {}, {}",
                accts.vault.to_account_info().lamports(),
                accts.presale_whitelisted_token_account.to_account_info().lamports()
            );
            msg!(
                "Token Balance after wrap-> base: {}, wsol: {}",
                accts.token_vault.amount,
                accts.presale_whitelisted_token_account.amount
            );
        }

        // transfer init_coin_amount TOKEN to user_token_coin
        let cpi_accounts = Transfer {
            from: accts.token_vault.to_account_info(),
            to: accts.user_token_coin.to_account_info(),
            authority: presale_state.to_account_info(),
        };

        let cpi_program = accts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, presale_state_seed);

        transfer(cpi_ctx, init_coin_amount)?;

        // transfer init_pc_amount WSOL to user_token_pc
        let cpi_accounts = Transfer {
            from: accts.presale_whitelisted_token_account.to_account_info(),
            to: accts.user_token_pc.to_account_info(),
            authority: accts.vault.to_account_info(),
        };

        let cpi_program = accts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, vault_seed);

        transfer(cpi_ctx, init_pc_amount)?;

        msg! {"Token Balance: {}", accts.user_token_coin.amount};
        msg! {"WSOL Balance: {}", accts.user_token_pc.amount};

        ////////////// Create Pool on Raydium ///////////////
        let inst: solana_program::instruction::Instruction = initialize2(
            &accts.raydium_amm_program.key(),
            &accts.amm_pool.key(),
            &accts.amm_authority.key(),
            &accts.amm_open_orders.key(),
            &accts.amm_lp_mint.key(),
            &accts.amm_coin_mint.key(),
            &accts.amm_pc_mint.key(),
            &accts.amm_coin_vault.key(),
            &accts.amm_pc_vault.key(),
            &accts.amm_target_orders.key(),
            &accts.amm_config.key(),
            &accts.create_fee_destination.key(),
            &accts.market_program.key(),
            &accts.market.key(),
            &accts.authority.key(),
            &accts.user_token_coin.key(),
            &accts.user_token_pc.key(),
            &accts.user_token_lp.key(),
            nonce,
            open_time,
            init_pc_amount,
            init_coin_amount,
        )?;

        let account_info_vec = vec![
            accts.token_program.to_account_info(),
            accts.associated_token_program.to_account_info(),
            accts.system_program.to_account_info(),
            accts.rent.to_account_info(),
            accts.amm_pool.to_account_info(),
            accts.amm_authority.to_account_info(),
            accts.amm_open_orders.to_account_info(),
            accts.amm_lp_mint.to_account_info(),
            accts.amm_coin_mint.to_account_info(),
            accts.amm_pc_mint.to_account_info(),
            accts.amm_coin_vault.to_account_info(),
            accts.amm_pc_vault.to_account_info(),
            accts.amm_target_orders.to_account_info(),
            accts.amm_config.to_account_info(),
            accts.create_fee_destination.to_account_info(),
            accts.market_program.to_account_info(),
            accts.market.to_account_info(),
            accts.authority.to_account_info(),
            accts.user_token_coin.to_account_info(),
            accts.user_token_pc.to_account_info(),
            accts.user_token_lp.to_account_info(),
        ];

        invoke(&inst, &account_info_vec)?;

        // let rest_base_amount = amt - presale_state.sold_token_amount - init_coin_amount;
        // rest_quote_amount = rest_quote_amount - init_pc_amount;

        // msg! {"Rest amounts-> token: {}, sol: {}", rest_base_amount, rest_quote_amount};
    }

    presale_state.state = 2;

    for i in 0..MAX_WHITELISTED_TOKENS {
        if presale_state.lp_created[i] == 0 {
            presale_state.state = 1;
            break;
        }
    }

    msg!("Presale were successfully finalized");

    Ok(())
}
