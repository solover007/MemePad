use anchor_lang::prelude::*;

use solana_program::{program::invoke_signed, system_instruction};

use anchor_spl::token::{Mint, Token, TokenAccount, Transfer, transfer};

use crate::{constants::*, errors::*, states::*};

#[derive(Accounts)]
#[instruction(
    quote_token_id: u8
)]
pub struct WithdrawQuoteToken<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

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

    /// CHECK: vault is withdraw vault.
    #[account(
        mut,
        seeds = [VAULT_SEED, presale_state.key().as_ref()],
        bump
    )]
    pub vault: AccountInfo<'info>,

    pub token_mint: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = presale_state.whitelisted_tokens[quote_token_id as usize],
        associated_token::authority = authority,
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint = presale_state.whitelisted_tokens[quote_token_id as usize],
        associated_token::authority = presale_state,
    )]
    pub presale_whitelisted_token_account: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

pub fn withdraw_quote_token(ctx: Context<WithdrawQuoteToken>, quote_token_id: u8) -> Result<()> {
    let accts = ctx.accounts;
    let presale_state = &mut accts.presale_state;

    let cur_timestamp = u64::try_from(Clock::get()?.unix_timestamp).unwrap();

    require!(
        cur_timestamp > presale_state.end_time,
        PresaleError::NotEndedYet
    );
    require!(
        presale_state.authority == accts.authority.key() || accts.global_state.authority == accts.authority.key(),
        PresaleError::Unauthorized
    );
    require!(
        presale_state.quote_token_amount[quote_token_id as usize] > presale_state.softcap_amount,
        PresaleError::ReachedAtSoftCap
    );

    let bump = ctx.bumps.get("vault").unwrap_or(&255);
    let presale_key = presale_state.key();
    let vault_seed: &[&[&[u8]]] = &[&[VAULT_SEED, presale_key.as_ref(), &[*bump]]];

    if quote_token_id == 0 {
        // Send Sol: presale vault -> Owner
        invoke_signed(
            &system_instruction::transfer(
                &accts.vault.key(),
                &accts.authority.key(),
                presale_state.quote_token_amount[quote_token_id as usize],
            ),
            &[
                accts.vault.to_account_info().clone(),
                accts.authority.to_account_info().clone(),
                accts.system_program.to_account_info().clone(),
            ],
            vault_seed,
        )?;
    } else {
        // Send SPL Token: presale token account -> user
        let bump = ctx.bumps.get("presale_state").unwrap_or(&255);
        let token_mint_key = accts.token_mint.key();
        let presale_state_seed: &[&[&[u8]]] =
            &[&[&PRESALE_STATE_SEED, token_mint_key.as_ref(), &[*bump]]];

        let cpi_accounts = Transfer {
            from: accts.presale_whitelisted_token_account.to_account_info(),
            to: accts.buyer_token_account.to_account_info(),
            authority: presale_state.to_account_info(),
        };

        let cpi_program = accts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, presale_state_seed);
        
        transfer(cpi_ctx, presale_state.quote_token_amount[quote_token_id as usize])?;
    }

    msg!(
        "Withdraw Quote Token-{}: {}",
        quote_token_id,
        presale_state.quote_token_amount[quote_token_id as usize]
    );

    presale_state.quote_token_amount[quote_token_id as usize] = 0;

    Ok(())
}
