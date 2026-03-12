use anchor_lang::prelude::*;

use crate::{constants::*, states::*};

use std::mem::size_of;

#[derive(Accounts)]
pub struct UpdateFee<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump,
        has_one = authority
    )]
    pub global_state: Account<'info, GlobalState>,
}

pub fn handle(
    ctx: Context<UpdateFee>,
    marketplace_fee: u64,
    penalty_fee: u64,
) -> Result<()> {
    let accts = ctx.accounts;
    
    accts.global_state.penalty_fee = penalty_fee;
    accts.global_state.marketplace_fee = marketplace_fee;

    Ok(())
}
