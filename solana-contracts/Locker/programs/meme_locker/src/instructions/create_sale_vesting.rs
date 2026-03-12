use anchor_lang::prelude::*;
use crate::{constants::*, errors::*, states::*};

use anchor_spl::token::Mint;


#[derive(Accounts)]
pub struct CreateSaleVesting<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        mut,
        seeds = [USER_STATE_SEED, user.key().as_ref(), token_mint.key().as_ref()],
        bump
    )]
    pub user_lp_state: Account<'info, UserLpState>,

    pub token_mint: Box<Account<'info, Mint>>,
}

pub fn handle(
    ctx: Context<CreateSaleVesting>,
    vesting_id: u8,
    sale_mode: u8,
    amount: u64,
    min_price: u64,
    immediate_price: u64
) -> Result<()> {
    let accts = ctx.accounts;
    
    require!(
        accts.user_lp_state.vesting_count > vesting_id,
        LockerError::InvalidId
    );

    require!(
        accts.user_lp_state.vests[vesting_id as usize].current_amount >= amount,
        LockerError::InsufficientBalance
    );
    
    let index = accts.user_lp_state.sale_vesting_count as usize;
    require!(index < MAX_VESTING_COUNT, LockerError::InvalidVestingCount);

    accts.user_lp_state.sale_vests[index] = SaleVestingState {
        original_id: vesting_id,
        sale_mode,
        amount,
        min_price,
        immediate_price,
        max_bid_price: 0,
        max_price_bidder: Pubkey::default()
    };

    accts.user_lp_state.vests[vesting_id as usize].current_amount = accts.user_lp_state.vests[vesting_id as usize].current_amount
        .checked_sub(amount)
        .unwrap();

    msg!("Successfully created save vesting: {} tokens", amount);
    
    Ok(())
}