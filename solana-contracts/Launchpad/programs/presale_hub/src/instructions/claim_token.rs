use anchor_lang::prelude::*;

use anchor_spl::token::{Mint, Token, TokenAccount, Transfer, transfer};

use crate::{constants::*, errors::*, states::*};

#[derive(Accounts)]
pub struct ClaimToken<'info> {
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [PRESALE_STATE_SEED, token_mint.key().as_ref()],
        bump
    )]
    pub presale_state: Box<Account<'info, PresaleState>>,

    #[account(
        mut,
        seeds = [USER_STATE_SEED, token_mint.key().as_ref(), user.key().as_ref()],
        bump,
    )]
    pub user_state: Box<Account<'info, UserState>>,

    #[account(mut, constraint = token_mint.key() == presale_state.token_mint_address)]
    pub token_mint: Box<Account<'info, Mint>>,

    #[account(mut, constraint = token_vault.owner == presale_state.key())]
    token_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = user_vault.owner == user.key())]
    user_vault: Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

pub fn claim_token(
    ctx: Context<ClaimToken>,
) -> Result<()> {
    let accts = ctx.accounts;
    let presale_state = &mut accts.presale_state;
    let user_state = &mut accts.user_state;
    
    let cur_timestamp = Clock::get()?.unix_timestamp as u64;

    require!(
        cur_timestamp > presale_state.end_time,
        PresaleError::NotEndedYet
    );
    require!(
        presale_state.state >= 3, // 3: finalized
        PresaleError::NotClaimableYet
    );
    require!(
        user_state.buy_token_amount > 0 && user_state.claim_amount < user_state.buy_token_amount,
        PresaleError::InsufficientClaimableAmount
    );

    let mut claimable_amount: u64;
    if presale_state.is_vesting == 1 {
        
        if cur_timestamp < presale_state.tge_date {
            claimable_amount = 0;
        } else {
            let claimable_pct = presale_state.tge_percent + presale_state.cycle_release_percent
                .checked_mul(cur_timestamp - presale_state.tge_date)
                .unwrap()
                .checked_div(presale_state.cycle_days)
                .unwrap();

            claimable_amount = user_state.buy_token_amount
                .checked_mul(claimable_pct)
                .unwrap()
                .checked_div(DENOMINATOR)
                .unwrap();

            msg!("claimable_cycles: {}", claimable_amount);
        }
    } else {
        claimable_amount = user_state.buy_token_amount;
    }

    claimable_amount = claimable_amount - user_state.claim_amount;
    user_state.claim_amount = user_state.claim_amount + claimable_amount;

    presale_state.claim_token_amount = presale_state.claim_token_amount + claimable_amount;

    // Send Token
    let bump = ctx.bumps.get("presale_state").unwrap_or(&255);
    let token_mint_key = accts.token_mint.key();
    let presale_state_seed: &[&[&[u8]]] =
        &[&[&PRESALE_STATE_SEED, token_mint_key.as_ref(), &[*bump]]];

    let cpi_accounts = Transfer {
        from: accts.token_vault.to_account_info(),
        to: accts.user_vault.to_account_info(),
        authority: presale_state.to_account_info(),
    };

    let cpi_program = accts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, presale_state_seed);

    transfer(cpi_ctx, claimable_amount)?;

    emit!(ClaimEvent {
        claim_amount: claimable_amount,
    });

    Ok(())
}

#[event]
pub struct ClaimEvent {
    pub claim_amount: u64,
}