use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Burn, TokenAccount, Transfer},
};

use crate::{constants::*, errors::*, states::*};

#[derive(Accounts)]
pub struct RefundBaseToken<'info> {
    pub authority: Signer<'info>,

    #[account(mut)]
    pub token_mint: Box<Account<'info, token::Mint>>,

    #[account(mut, constraint = token_vault.owner == presale_state.key())]
    pub token_vault: Box<Account<'info, token::TokenAccount>>,

    #[account(
        mut,
        seeds = [PRESALE_STATE_SEED, token_mint.key().as_ref()],
        bump
    )]
    pub presale_state: Box<Account<'info, PresaleState>>,

    #[account(
        mut,
        associated_token::mint = presale_state.token_mint_address,
        associated_token::authority = authority,
    )]
    pub owner_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

pub fn refund_base_token(
    ctx: Context<RefundBaseToken>,
) -> Result<()> {
    let accts = ctx.accounts;
    let presale_state = &mut accts.presale_state;

    let cur_timestamp = u64::try_from(Clock::get()?.unix_timestamp).unwrap();

    require!(
        presale_state.state == 3,
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

    // BaseToken
    let amt: u64 = accts.token_vault.amount;

    let bump = ctx.bumps.get("presale_state").unwrap_or(&255);
    let token_mint_key = accts.token_mint.key();
    let presale_state_seed: &[&[&[u8]]] =
        &[&[&PRESALE_STATE_SEED, token_mint_key.as_ref(), &[*bump]]];

    let rest_base_amount = amt - presale_state.sold_token_amount;

    if presale_state.refund_type == 0 {
        // Burn token
        let cpi_accounts = Burn {
            mint: accts.token_mint.to_account_info(),
            from: accts.token_vault.to_account_info(),
            authority: presale_state.to_account_info(),
        };
        let cpi_program = accts.token_program.to_account_info();
        let cpi_ctx =
            CpiContext::new_with_signer(cpi_program, cpi_accounts, presale_state_seed);

        token::burn(cpi_ctx, rest_base_amount)?;
    } else {
        // Send Token
        let cpi_accounts = Transfer {
            from: accts.token_vault.to_account_info(),
            to: accts.owner_token_account.to_account_info(),
            authority: presale_state.to_account_info(),
        };

        let cpi_program = accts.token_program.to_account_info();
        let cpi_ctx =
            CpiContext::new_with_signer(cpi_program, cpi_accounts, presale_state_seed);

        let _ = token::transfer(cpi_ctx, rest_base_amount);
    }

    msg!("SOL were refunded: {}", rest_base_amount);

    presale_state.state = 4;

    msg!("Presale were successfully finalized");

    Ok(())
}
