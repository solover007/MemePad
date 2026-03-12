use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, TokenAccount, Transfer},
};
use solana_program::{system_instruction, program::invoke};

use crate::{constants::*, states::*, utils::*};


#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    user: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump,
      )]
    pub global_state: Account<'info, GlobalState>,

    #[account(mut)]
    pub token_mint: Account<'info, token::Mint>,

    #[account(mut, constraint = token_vault.owner == global_state.key())]
    pub token_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = user_vault.owner == user.key())]
    pub user_vault: Box<Account<'info, TokenAccount>>,
    
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

pub fn deposit(ctx: Context<Deposit>, token_amount: u64) -> Result<()> {
    let accts = ctx.accounts;
    let global_state = &mut accts.global_state;
    let token_index;

    token_index = find_index(&global_state.whitelisted_tokens, accts.token_mint.key()).unwrap();
    // require!(token_index < MAX_WHITELISTED_TOKENS, StakingError::NotWhitelistedToken);

    if token_index == 0 {
        // Send SOL: user -> global_state
        invoke(
            &system_instruction::transfer(
                &accts.user.key(),
                &global_state.key(),
                token_amount
            ),
            &[
                accts.user.to_account_info().clone(),
                global_state.to_account_info().clone(),
                accts.system_program.to_account_info().clone()
            ]
        )?;
    } else {
        // Send Token
        let cpi_accounts = Transfer {
            from: accts.user_vault.to_account_info(),
            to: accts.token_vault.to_account_info(),
            authority: accts.user.to_account_info(),
        };
        let cpi_program = accts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, token_amount)?;
    }
    
    // global_state.deposit_amount = global_state.deposit_amount + token_amount;

    msg!("Successfully deposited: {}", token_amount);

    Ok(())
}
