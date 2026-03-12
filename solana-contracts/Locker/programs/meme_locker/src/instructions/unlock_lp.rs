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
#[instruction(
    vesting_id: u8,
    amount: u64
)]
pub struct UnlockLP<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        mut,
        seeds = [USER_STATE_SEED, user.key().as_ref(), token_mint.key().as_ref()],
        bump
    )]
    pub user_lp_state: Account<'info, UserLpState>,

    #[account(mut, constraint = token_vault.owner == global_state.key())]
    pub token_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = user_vault.owner == user.key())]
    pub user_vault: Box<Account<'info, TokenAccount>>,

    pub token_mint: Box<Account<'info, Mint>>,
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(
    ctx: Context<UnlockLP>,
    vesting_id: u8,
    amount: u64
) -> Result<()> {
    // let accts = ctx.accounts;
    
    // require!(
    //     accts.user_lp_state.vesting_count > vesting_id,
    //     LockerError::NotLocked
    // );

    // let cur_vesting = &mut accts.user_lp_state.vests[vesting_id as usize];

    // require!(
    //     cur_vesting.amount >= cur_vesting.claim_amount + amount,
    //     LockerError::InsufficientBalance
    // );
    
    // let cur_timestamp = Clock::get()?.unix_timestamp as u64;
    
    // require!(cur_timestamp > cur_vesting.tge_date, LockerError::NotAllowedYet);
    

    // let withdrawable_amount;
    
    // if cur_timestamp < cur_vesting.tge_date {
    //     withdrawable_amount = 0;
    // } else {
    //     let claimable_cycles = cur_timestamp.
    //         checked_sub(cur_vesting.tge_date)
    //         .unwrap()
    //         .checked_div(cur_vesting.cycle_days)
    //         .unwrap();

    //     msg!("claimable_cycles: {}", claimable_cycles);

    //     withdrawable_amount = cur_vesting.amount
    //         .checked_mul(cur_vesting.tge_percent + claimable_cycles
    //             .checked_mul(cur_vesting.cycle_release_percent)
    //             .unwrap()
    //         )
    //         .unwrap()
    //         .checked_div(DENOMINATOR)
    //         .unwrap();
    // }


    // require!(withdrawable_amount - cur_vesting.claim_amount >= amount, LockerError::InsufficientBalance);

    // let bump = ctx.bumps.global_state;
    // let global_state_seed: &[&[&[u8]]] = &[&[&GLOBAL_STATE_SEED, &[bump]]];

    // let cpi_accounts = Transfer {
    //     from: accts.token_vault.to_account_info(),
    //     to: accts.user_vault.to_account_info(),
    //     authority: accts.global_state.to_account_info()
    // };
    // let cpi_program = accts.token_program.to_account_info();
    // let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, global_state_seed);
    // token::transfer(cpi_ctx, amount)?;

    // cur_vesting.claim_amount = cur_vesting.claim_amount
    //     .checked_add(amount)
    //     .unwrap();

    // msg!("Successfully unlocked {} tokens", amount);
    
    Ok(())
}
