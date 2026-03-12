use anchor_lang::prelude::*;
use solana_program::{
    native_token::LAMPORTS_PER_SOL,
    program::invoke, system_instruction
};

use anchor_spl::token::{Mint, Token, TokenAccount, Transfer};

use crate::{constants::*, errors::*, states::*, utils::*};

#[derive(Accounts)]
#[instruction(
    quote_token_id: u8,
    token_amount: u64,
    quote_token_amount: u64,
)]
pub struct BuyTokenWithSol<'info> {
    #[account(mut)]
    buyer: Signer<'info>,

    #[account(
        mut,
        seeds = [PRESALE_STATE_SEED, token_mint.key().as_ref()],
        bump
    )]
    pub presale_state: Box<Account<'info, PresaleState>>,

    /// CHECK: vault is token vault
    #[account(
        mut,
        address = presale_state.vault
    )]
    pub vault: AccountInfo<'info>,

    #[account(
        init_if_needed,
        seeds = [USER_STATE_SEED, token_mint.key().as_ref(), buyer.key().as_ref()],
        bump,
        payer = buyer,
        space = 8 + std::mem::size_of::<UserState>(),
    )]
    pub user_state: Box<Account<'info, UserState>>,

    pub token_mint: Account<'info, Mint>,
    
    #[account(
        mut,
        associated_token::mint = presale_state.whitelisted_tokens[quote_token_id as usize],
        associated_token::authority = buyer,
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,

    pub quote_token_mint: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = presale_state.whitelisted_tokens[quote_token_id as usize],
        associated_token::authority = presale_state,
    )]
    pub presale_whitelisted_token_account: Account<'info, TokenAccount>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

pub fn buy_token_with_sol(
    ctx: Context<BuyTokenWithSol>,
    quote_token_id: u8,
    token_amount: u64,
    quote_token_amount: u64,
) -> Result<()> {
    let accts = ctx.accounts;
    let presale_state = &mut accts.presale_state;
    let user_state = &mut accts.user_state;

    let cur_timestamp = u64::try_from(Clock::get()?.unix_timestamp).unwrap();
    let quote_decimals = accts.quote_token_mint.decimals;

    require!(presale_state.state == 1, PresaleError::NotCreated);
    require!(
        presale_state.start_time < cur_timestamp,
        PresaleError::NotStarted
    );
    require!(
        presale_state.end_time > cur_timestamp,
        PresaleError::AlreadyEnded
    );
    require!(
        presale_state.valid_whitelist_token_count > quote_token_id,
        PresaleError::InvalidQuoteToken
    );
    msg!("Quote Token Id: {}", quote_token_id);

    require!(
        token_amount
            <= (quote_token_amount as u128
                * presale_state.presale_price[quote_token_id as usize] as u128
                / DENOMINATOR as u128) as u64,
        PresaleError::InsufficientQuoteTokenAmount
    );
    require!(
        (quote_to_sol(presale_state, quote_token_id, quote_token_amount as u128)? as u128).checked_mul(LAMPORTS_PER_SOL as u128).unwrap() >= (presale_state.min_buy as u128).checked_mul(10_i32.pow(quote_decimals as u32) as u128).unwrap(),
        PresaleError::InvalidBuyAmount
    );
    require!(
        (quote_to_sol(presale_state, quote_token_id, (user_state.buy_quote_token_amount[quote_token_id as usize] + quote_token_amount) as u128)? as u128).checked_mul(LAMPORTS_PER_SOL as u128).unwrap()
            <= (presale_state.max_buy as u128).checked_mul(10_i32.pow(quote_decimals as u32) as u128).unwrap(), // Need to conside price based on SOL
        PresaleError::InvalidBuyAmount
    );
    require!(
        (quote_to_sol(presale_state, quote_token_id, (presale_state.quote_token_amount[quote_token_id as usize] + quote_token_amount) as u128)? as u128).checked_mul(LAMPORTS_PER_SOL as u128).unwrap()
            <= (presale_state.hardcap_amount as u128).checked_mul(10_i32.pow(quote_decimals as u32) as u128).unwrap(),
        PresaleError::OverflowHardCap
    );

    if quote_token_id == 0 {
        // Send Sol: user -> presale vault
        invoke(
            &system_instruction::transfer(
                &accts.buyer.key(),
                &accts.vault.key(),
                quote_token_amount,
            ),
            &[
                accts.buyer.to_account_info().clone(),
                accts.vault.to_account_info().clone(),
                accts.system_program.to_account_info().clone(),
            ],
        )?;
    } else {
        // Send SPL Token: user -> presale token account
        let cpi_accounts = Transfer {
            from: accts.buyer_token_account.to_account_info(),
            to: accts.presale_whitelisted_token_account.to_account_info(),
            authority: accts.buyer.to_account_info(),
        };

        let cpi_program = accts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        anchor_spl::token::transfer(cpi_ctx, quote_token_amount)?;
    }

    if user_state.buy_token_amount == 0 {
        presale_state.holders += 1;
    }

    user_state.buy_token_amount = user_state.buy_token_amount + token_amount;
    user_state.buy_quote_token_amount[quote_token_id as usize] =
        user_state.buy_quote_token_amount[quote_token_id as usize] + quote_token_amount;
    user_state.buy_time = cur_timestamp;

    presale_state.sold_token_amount = presale_state.sold_token_amount + token_amount;
    presale_state.quote_token_amount[quote_token_id as usize] =
        presale_state.quote_token_amount[quote_token_id as usize] + quote_token_amount;

    emit!(BuyEvent {
        quote_token_id: quote_token_id,
        amount: quote_token_amount,
    });

    Ok(())
}

#[event]
pub struct BuyEvent {
    pub quote_token_id: u8,
    pub amount: u64,
}
