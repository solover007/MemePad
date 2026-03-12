use anchor_lang::prelude::*;

use crate::constants::MAX_VESTING_COUNT;

#[account]
#[derive(Default)]
pub struct UserLpState {
    // user
    pub authority: Pubkey,
    
    pub mint_key: Pubkey,
    
    pub vesting_count: u8,

    pub vests: [VestingState; MAX_VESTING_COUNT],
    
    pub sale_vesting_count: u8,

    pub sale_vests: [SaleVestingState; MAX_VESTING_COUNT],
}

#[account]
#[derive(Default)]
pub struct VestingPlan {
    // Initial locked amount
    pub total_amount: u64, 
    
    // first release time
    pub tge_date: u64,
    
    // first release amount(percent)
    pub tge_percent: u64,
    
    // period between cycles
    pub cycle_days: u64,
    
    // release amount between cycles(percent)
    pub cycle_release_percent: u64,
}

#[account]
#[derive(Default)]
pub struct VestingState {
    // Initial locked amount
    pub plan: VestingPlan, 
    
    // current amount
    pub current_amount: u64,
    
    // created date
    pub created_at: u64,
}

#[account]
#[derive(Default)]
pub struct SaleVestingState {
    // vesting schedule
    pub original_id: u8,

    // sale mode: 0: fixed, 1: auction
    pub sale_mode: u8,

    // sale amount
    pub amount: u64,

    pub min_price: u64,
    pub immediate_price: u64,

    pub max_bid_price: u64,
    pub max_price_bidder: Pubkey,
}
