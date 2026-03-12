use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod states;
pub mod utils;

use crate::{constants::*, instructions::*};

declare_id!("6u5XvaqXctmmEKkHHTtRiDTkLvLLPYj2X1ghN3ZfYs3S");

#[program]
pub mod presale_hub {
    use super::*;

    pub fn create_presale(
        _ctx: Context<CreatePresale>,
        token_mint_address: Pubkey,
        softcap_amount: u64,
        hardcap_amount: u64,
        start_time: u64,
        end_time: u64,
        presale_price: [u64; MAX_WHITELISTED_TOKENS],
        listing_price: u64,
        lp_percent: u64,
        is_auto_listing: bool,
        lock_period: u64,
        min_buy: u64,
        max_buy: u64,
        refund_type: u8,
        is_vesting: u8,
        tge_date: u64,
        tge_percent: u64,
        cycle_days: u64,
        cycle_release_percent: u64,
        pad_fee_pct: u64,
        valid_token_count: u8,
        whitelisted_tokens: [Pubkey; MAX_WHITELISTED_TOKENS]
    ) -> Result<()> {
        return create_presale::create_presale(
            _ctx,
            token_mint_address,
            softcap_amount,
            hardcap_amount,
            start_time,
            end_time,
            presale_price,
            listing_price,
            lp_percent,
            is_auto_listing,
            lock_period,
            min_buy,
            max_buy,
            refund_type,
            is_vesting,
            tge_date,
            tge_percent,
            cycle_days,
            cycle_release_percent,
            pad_fee_pct,
            valid_token_count,
            whitelisted_tokens
        );
    }

    pub fn buy_token_with_sol(
        ctx: Context<BuyTokenWithSol>,
        quote_token_id: u8,
        token_amount: u64,
        quote_token_amount: u64,
    ) -> Result<()> {
        return buy_token_with_sol::buy_token_with_sol(ctx, quote_token_id, token_amount, quote_token_amount);
    }

    pub fn claim_token(ctx: Context<ClaimToken>) -> Result<()> {
        return claim_token::claim_token(ctx);
    }

    pub fn create_dlmm_pool<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, CreateDlmmPool<'info>>,
        active_id: i32,
        bin_step: u16,
        // base_factor: u16,
    ) -> Result<()> {
        // create_dlmm_pool::create_dlmm_pool(ctx, active_id, bin_step, base_factor)
        create_dlmm_pool::create_dlmm_pool(ctx, active_id, bin_step)
    }

    pub fn add_liquidity<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, AddLiquidity<'info>>,
        liquidity_parameter: dlmm::instructions::add_liquidity::LiquidityParameter,
    ) -> Result<()> {
        // create_dlmm_pool::create_dlmm_pool(ctx, active_id, bin_step, base_factor)
        add_liquidity::add_liquidity(ctx, liquidity_parameter)
    }

    pub fn add_liquidity_by_weight<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, AddLiquidity<'info>>,
        liquidity_parameter: dlmm::instructions::add_liquidity_by_weight::LiquidityParameterByWeight,
    ) -> Result<()> {
        // create_dlmm_pool::create_dlmm_pool(ctx, active_id, bin_step, base_factor)
        add_liquidity::add_liquidity_by_weight(ctx, liquidity_parameter)
    }

    pub fn add_liquidity_by_strategy<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, AddLiquidity<'info>>,
        liquidity_parameter: dlmm::instructions::add_liquidity_by_strategy::LiquidityParameterByStrategy,
    ) -> Result<()> {
        // create_dlmm_pool::create_dlmm_pool(ctx, active_id, bin_step, base_factor)
        add_liquidity::add_liquidity_by_strategy(ctx, liquidity_parameter)
    }

    pub fn add_liquidity_by_strategy_one_side<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, AddLiquidityOneSide<'info>>,
        liquidity_parameter: dlmm::instructions::add_liquidity_by_strategy_one_side::LiquidityParameterByStrategyOneSide,
    ) -> Result<()> {
        add_liquidity_one_side::add_liquidity_by_strategy_one_side(ctx, liquidity_parameter)
    }

    pub fn add_liquidity_one_side<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, AddLiquidityOneSide<'info>>,
        liquidity_parameter: dlmm::instructions::add_liquidity_by_weight_one_side::LiquidityOneSideParameter,
    ) -> Result<()> {
        add_liquidity_one_side::add_liquidity_one_side(ctx, liquidity_parameter)
    }

    pub fn finalize_presale(
        ctx: Context<FinalizePresale>,
        quote_token_id: u8,
    ) -> Result<()> {
        return finalize_presale::finalize_presale(ctx, quote_token_id);
    }
    
    pub fn refund_base_token(
        ctx: Context<RefundBaseToken>,
    ) -> Result<()> {
        return refund_base_token::refund_base_token(ctx);
    }

    pub fn emergency_withdraw(
        ctx: Context<EmergencyWithdraw>,
        quote_token_id: u8,
    ) -> Result<()> {
        return emergency_withdraw::emergency_withdraw(ctx, quote_token_id);
    }

    pub fn withdraw_quote_token(
        ctx: Context<WithdrawQuoteToken>, 
        quote_token_id: u8
    ) -> Result<()> {
        return withdraw_quote_token::withdraw_quote_token(ctx, quote_token_id);
    }

    pub fn update_price(
        ctx: Context<UpdatePrice>,
        quote_token_id: u8,
        new_price: u64,
    ) -> Result<()> {
        return update_price::update_price(ctx, quote_token_id, new_price);
    }

    pub fn initialize(ctx: Context<Initialize>, authority: Pubkey) -> Result<()> {
        return initialize::initialize(ctx, authority);
    }
}
