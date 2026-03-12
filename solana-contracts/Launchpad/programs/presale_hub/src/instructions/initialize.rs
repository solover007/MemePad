use anchor_lang::prelude::*;

use crate::{constants::*, states::*, errors::*};

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer = signer,
        space = 8 + std::mem::size_of::<GlobalState>(),
        seeds = [GLOBAL_STATE_SEED],
        bump
    )]
    pub global_state: Box<Account<'info, GlobalState>>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>
}

impl<'info> Initialize<'info> {
    pub fn validate(&self) -> Result<()> {
        if self.global_state.is_initialized == 1 {
            require!(
                self.global_state.authority.eq(&self.signer.key()),
                PresaleError::Unauthorized
            )
        }
        Ok(())
    }
}

/// Initialize Launchpad Program for the first time
/// to init global state with some data for validation
pub fn initialize(_ctx: Context<Initialize>, authority: Pubkey) -> Result<()> {
    
    _ctx.accounts.global_state.is_initialized = 1;
    _ctx.accounts.global_state.authority = _ctx.accounts.signer.key();
    _ctx.accounts.global_state.treasury = authority;

    Ok(())
}