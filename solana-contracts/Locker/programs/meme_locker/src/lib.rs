use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod states;

use instructions::*;

declare_id!("4P5xW8n8FRAemFFYdqod3A68cpKeP7A97AmZw7CpJxV8");

#[program]
pub mod lp_locker {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, new_authority: Pubkey) -> Result<()> {
        initialize::handle(ctx, new_authority)
    }
    
    pub fn update_fee(ctx: Context<UpdateFee>, marketplace_fee: u64, penalty_fee: u64,) -> Result<()> {
        update_fee::handle(ctx, marketplace_fee, penalty_fee)
    }

    pub fn start_lock(ctx: Context<StartLock>) -> Result<()> {
        start_lock::handle(ctx)
    }

    pub fn lock_lp(
        ctx: Context<LockLP>,
        amount: u64,
        tge_date: u64,
        tge_percent: u64,
        cycle_days: u64,
        cycle_release_percent: u64,
    ) -> Result<()> {
        return lock_lp::handle(
            ctx,
            amount,
            tge_date,
            tge_percent,
            cycle_days,
            cycle_release_percent,
        );
    }

    pub fn unlock_lp(ctx: Context<UnlockLP>, vesting_id: u8, amount: u64) -> Result<()> {
        return unlock_lp::handle(ctx, vesting_id, amount);
    }

    pub fn create_sale_vesting(
        ctx: Context<CreateSaleVesting>,
        vesting_id: u8,
        sale_mode: u8,
        amount: u64,
        min_price: u64,
        immediate_price: u64,
    ) -> Result<()> {
        return create_sale_vesting::handle(ctx, vesting_id, sale_mode, amount, min_price, immediate_price);
    }

    pub fn buy_sale_vesting(
        ctx: Context<BuySaleVesting>,
        vesting_id: u8,
        amount: u64,
        bid_price: u64,
    ) -> Result<()> {
        return buy_sale_vesting::handle(ctx, vesting_id, amount, bid_price);
    }
    
    pub fn approve_sale_vesting(
        ctx: Context<ApproveSaleVesting>,
        sale_vesting_id: u8,
    ) -> Result<()> {
        return approve_sale_vesting::handle(ctx, sale_vesting_id);
    }
    
    pub fn cancel_sale_vesting(
        ctx: Context<CancelSaleVesting>,
        sale_vesting_id: u8,
    ) -> Result<()> {
        return cancel_sale_vesting::handle(ctx, sale_vesting_id);
    }
    
    pub fn cancel_auction_bid(
        ctx: Context<CancelAuctionBid>,
        sale_vesting_id: u8,
    ) -> Result<()> {
        return cancel_auction_bid::handle(ctx, sale_vesting_id);
    }
}
