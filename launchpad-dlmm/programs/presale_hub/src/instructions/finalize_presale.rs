use anchor_lang::prelude::*;

use solana_program::{
    program::invoke_signed,
    system_instruction,
};

use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, TokenAccount, Transfer, transfer},
};

use crate::{constants::*, errors::*, states::*};

#[derive(Accounts)]
#[instruction(
    quote_token_id: u8
)]
pub struct FinalizePresale<'info> {
    pub authority: Signer<'info>,

    #[account(mut)]
    pub token_mint: Box<Account<'info, token::Mint>>,

    #[account(mut, constraint = token_vault.owner == presale_state.key())]
    pub token_vault: Box<Account<'info, token::TokenAccount>>,

    #[account(mut, constraint = quote_token_vault.owner == presale_state.key())]
    pub quote_token_vault: Box<Account<'info, token::TokenAccount>>,

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

    /// CHECK: vault is finalize vault.
    #[account(
        mut,
        seeds = [VAULT_SEED, presale_state.key().as_ref()],
        bump
    )]
    pub vault: AccountInfo<'info>,

    #[account(mut, address = global_state.treasury)]
    /// CHECK: this should be checked with address in global_state
    pub treasury: AccountInfo<'info>,

    #[account(mut)]
    // constraint = user_token_coin.owner == authority.key()
    /// CHECK: raydium will check
    pub user_token_coin: Box<Account<'info, TokenAccount>>,

    #[account(mut)] 
    // constraint = user_token_pc.owner == authority.key()
    /// CHECK: raydium will check
    pub user_token_pc: Box<Account<'info, TokenAccount>>,
 
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

pub fn finalize_presale(
    ctx: Context<FinalizePresale>,
    quote_token_id: u8,
) -> Result<()> {
    let accts = ctx.accounts;
    let presale_state = &mut accts.presale_state;

    let cur_timestamp = u64::try_from(Clock::get()?.unix_timestamp).unwrap();

    require!(
        presale_state.state >= 2,
        PresaleError::AlreadyFinalized
    );
    require!(
        accts.authority.key() == presale_state.authority,
        PresaleError::Unauthorized
    );
    require!(
        cur_timestamp > presale_state.end_time,
        PresaleError::NotEndedYet
    );
    require!(
        presale_state.softcap_amount <= presale_state.quote_token_amount[quote_token_id as usize],
        PresaleError::NotReachedAtSoftCap
    );

    let bump = ctx.bumps.get("vault").unwrap_or(&255);
    let presale_key = presale_state.key();
    let vault_seed: &[&[&[u8]]] = &[&[VAULT_SEED, presale_key.as_ref(), &[*bump]]];

    let bump2 = ctx.bumps.get("presale_state").unwrap_or(&255);
    let token_mint_key = accts.token_mint.key();
    let presale_state_seed: &[&[&[u8]]] =
        &[&[&PRESALE_STATE_SEED, token_mint_key.as_ref(), &[*bump2]]];

    if quote_token_id == 0 {
        let rent_fee = 100000000; // 0.1Sol
        let rest_sol_balance = accts.vault.to_account_info().lamports() - rent_fee;

         // Send Sol: presale vault -> Authority
         invoke_signed(
            &system_instruction::transfer(
                &accts.vault.key(),
                &accts.authority.key(),
                rest_sol_balance,
            ),
            &[
                accts.vault.to_account_info().clone(),
                accts.authority.to_account_info().clone(),
                accts.system_program.to_account_info().clone(),
            ],
            vault_seed,
        )?;
    } else {
        // Quote token
        let rest_quote_token: u64 = accts.quote_token_vault.amount;

        // Send Token
        let cpi_accounts = Transfer {
            from: accts.quote_token_vault.to_account_info(),
            to: accts.user_token_coin.to_account_info(),
            authority: presale_state.to_account_info(),
        };

        let cpi_program = accts.token_program.to_account_info();
        let cpi_ctx =
            CpiContext::new_with_signer(cpi_program, cpi_accounts, presale_state_seed);

        transfer(cpi_ctx, rest_quote_token)?;
    }

    emit!(
        FinalizeEvent {
            quote_token_id: quote_token_id
        }
    );
    
    Ok(())
}

#[event]
pub struct FinalizeEvent {
    pub quote_token_id: u8,
}