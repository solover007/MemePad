use crate::{constants::*, errors::*, instructions::*, states::*};
use anchor_lang::prelude::*;
use solana_program::{
    program::{invoke, invoke_signed},
    system_instruction
};
use anchor_spl::{
    token::{self, Mint, MintTo, Token, TokenAccount, Transfer},
    associated_token::AssociatedToken
};
use std::mem::size_of;

#[derive(Accounts)]
pub struct LockLP<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        init_if_needed,
        seeds = [USER_STATE_SEED, user.key().as_ref(), token_mint.key().as_ref()],
        bump,
        payer = user,
        space = 8 + size_of::<UserLpState>()
    )]
    pub user_lp_state: Account<'info, UserLpState>,

    #[account(
        init_if_needed,
        associated_token::mint=token_mint,
        associated_token::authority=global_state,
        payer = user,
    )]
    pub token_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = user_vault.owner == user.key())]
    pub user_vault: Box<Account<'info, TokenAccount>>,

    pub token_mint: Box<Account<'info, Mint>>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(
    ctx: Context<LockLP>,
    amount: u64,
    tge_date: u64,
    tge_percent: u64,
    cycle_days: u64,
    cycle_release_percent: u64
) -> Result<()> {
    let accts = ctx.accounts;

    require!(accts.global_state.is_started == 1, LockerError::NotStarted);

    require!((accts.user_lp_state.vesting_count as usize) < MAX_VESTING_COUNT, LockerError::InvalidVestingCount);
    
    let cur_timestamp = Clock::get()?.unix_timestamp as u64;
    
    require!(cur_timestamp  < tge_date, LockerError::InvalidLockTime);

    let cpi_accounts = Transfer {
        from: accts.user_vault.to_account_info(),
        to: accts.token_vault.to_account_info(),
        authority: accts.user.to_account_info()
    };

    let index = accts.user_lp_state.vesting_count as usize;
    accts.user_lp_state.vests[index] = VestingState {
        plan: VestingPlan {
            total_amount: amount,
            tge_date,
            tge_percent,
            cycle_days,
            cycle_release_percent
        },
        current_amount: amount,
        created_at: cur_timestamp
    };

    // Send Token: User -> Contract
    let cpi_program = accts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, amount)?;

    accts.user_lp_state.authority = accts.user.key();
    accts.user_lp_state.mint_key = accts.token_mint.key();
    
    Ok(())
}
