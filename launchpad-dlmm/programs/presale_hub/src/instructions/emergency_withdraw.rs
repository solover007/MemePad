use anchor_lang::prelude::*;

use anchor_spl::token::{Mint, Token, TokenAccount, Transfer, transfer};

use solana_program::{program::invoke_signed, system_instruction};

use crate::{constants::*, errors::*, states::*};

#[derive(Accounts)]
#[instruction(
    quote_token_id: u8
)]
pub struct EmergencyWithdraw<'info> {
    #[account(mut)]
    buyer: Signer<'info>,

    #[account(
        mut,
        seeds = [PRESALE_STATE_SEED, token_mint.key().as_ref()],
        bump
    )]
    pub presale_state: Box<Account<'info, PresaleState>>,

    #[account(
        mut,
        seeds = [USER_STATE_SEED, token_mint.key().as_ref(), buyer.key().as_ref()],
        bump,
    )]
    pub user_state: Box<Account<'info, UserState>>,

    /// CHECK: vault is withdraw vault.
    #[account(
        mut,
        seeds = [VAULT_SEED, presale_state.key().as_ref()],
        bump
    )]
    pub vault: AccountInfo<'info>,

    #[account(mut, constraint = token_mint.key() == presale_state.token_mint_address)]
    pub token_mint: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = presale_state.whitelisted_tokens[quote_token_id as usize],
        associated_token::authority = buyer,
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

pub fn emergency_withdraw(
    ctx: Context<EmergencyWithdraw>, 
    quote_token_id: u8
) -> Result<()> {
    let accts = ctx.accounts;
    let presale_state = &mut accts.presale_state;
    let user_state = &mut accts.user_state;

    let cur_timestamp = u64::try_from(Clock::get()?.unix_timestamp).unwrap();

    let refund_amount: u64;
    if cur_timestamp < presale_state.end_time {
        // Presale not ended yet
        require!(
            presale_state.end_time > cur_timestamp + EMERGENCY_WITHDRAW_PERIOD,
            PresaleError::AlreadyEnded
        );
        require!(
            user_state.buy_token_amount > 0,
            PresaleError::InvalidInvestor
        );

        refund_amount = user_state.buy_quote_token_amount[quote_token_id as usize]
            - user_state.buy_quote_token_amount[quote_token_id as usize] * PENALTY_FEE
                / DENOMINATOR;
    } else {
        // Presale ended but softcap does not hit
        require!(
            presale_state.quote_token_amount[quote_token_id as usize]
                < presale_state.softcap_amount,
            PresaleError::NotReachedAtSoftCap
        );

        refund_amount = user_state.buy_quote_token_amount[quote_token_id as usize]
    }

    let bump = ctx.bumps.get("vault").unwrap_or(&255);
    let presale_key = presale_state.key();
    let vault_seed: &[&[&[u8]]] = &[&[VAULT_SEED, presale_key.as_ref(), &[*bump]]];

    if quote_token_id == 0 {
        // Send Sol: presale vault -> Owner
        invoke_signed(
            &system_instruction::transfer(&accts.vault.key(), &accts.buyer.key(), refund_amount),
            &[
                accts.vault.to_account_info().clone(),
                accts.buyer.to_account_info().clone(),
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
        
        transfer(cpi_ctx, refund_amount)?;
    }

    presale_state.holders -= 1;
    presale_state.sold_token_amount = presale_state.sold_token_amount - user_state.buy_token_amount;
    presale_state.quote_token_amount[quote_token_id as usize] =
        presale_state.quote_token_amount[quote_token_id as usize] - refund_amount;

    user_state.buy_token_amount = 0;
    user_state.buy_quote_token_amount[quote_token_id as usize] = 0;
    user_state.buy_time = 0;

    Ok(())
}
