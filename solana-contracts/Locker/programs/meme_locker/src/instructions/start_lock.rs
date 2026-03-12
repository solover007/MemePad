use crate::{constants::*, instructions::*, states::*};
use anchor_lang::prelude::*;


#[derive(Accounts)]
pub struct StartLock<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump,
    )]
    pub global_state: Account<'info, GlobalState>,
}

pub fn handle(ctx: Context<StartLock>) -> Result<()> {
    let accts = ctx.accounts;
    accts.global_state.is_started = 1;

    Ok(())
}