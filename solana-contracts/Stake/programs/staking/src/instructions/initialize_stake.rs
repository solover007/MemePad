use anchor_lang::prelude::*;
use anchor_spl::{
    token::self,
};

use crate::{constants::*, states::*, errors::*, utils::*};


#[derive(Accounts)]
#[instruction(
    card_no: u8
)]
pub struct InitializeStake<'info> {
    #[account(mut)]
    user: Signer<'info>,

    #[account(
        seeds = [GLOBAL_STATE_SEED],
        bump,
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        init,
        seeds = [STAKE_STATE_SEED, token_mint.key().as_ref(), [card_no].as_ref()],
        bump,
        payer = user,
        space = 8 + std::mem::size_of::<StakeState>(),
    )]
    pub stake_state: Box<Account<'info, StakeState>>,

    #[account(mut)]
    pub token_mint: Account<'info, token::Mint>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>
}

pub fn initialize_stake(
    ctx: Context<InitializeStake>,
    card_no: u8,
) -> Result<()> {
    let accts = ctx.accounts;
    let global_state = &accts.global_state;
    let stake_state = &mut accts.stake_state;
    let token_index;

    token_index = find_index(&global_state.whitelisted_tokens, accts.token_mint.key()).unwrap();
    require!(token_index < MAX_WHITELISTED_TOKENS, StakingError::NotWhitelistedToken);

    require!(stake_state.is_initialized == 0, StakingError::AlreadyCreated);
    
    stake_state.is_initialized = 1;
    stake_state.token_index = token_index as u8;
    stake_state.token_mint = accts.token_mint.key();
    stake_state.card_no = card_no;
    
    Ok(())
}