use anchor_lang::prelude::*;
use crate::constants::MAX_WHITELISTED_TOKENS;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod states;
pub mod utils;

use instructions::*;

declare_id!("GiMfRW9sVJP9TL7kUB22APwoSf5XNk1VmvYW9eZtqP2S");

#[program]
pub mod staking {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, whitelisted_tokens: [Pubkey; MAX_WHITELISTED_TOKENS]) -> Result<()> {
        return initialize::handle(ctx, whitelisted_tokens);
    }
    
    pub fn initialize_stake(ctx: Context<InitializeStake>, card_no: u8) -> Result<()> {
        return initialize_stake::initialize_stake(ctx, card_no);
    }

    pub fn stake_token(ctx: Context<StakeToken>, card_no: u8, token_amount: u64) -> Result<()> {
        return stake_token::stake_token(ctx, card_no, token_amount);
    }
    
    pub fn claim_token(ctx: Context<ClaimToken>, card_no: u8) -> Result<()> {
        return claim_token::claim_token(ctx, card_no);
    }

    pub fn unstake_token(ctx: Context<WithdrawToken>, card_no: u8) -> Result<()> {
        return unstake_token::unstake_token(ctx, card_no);
    }
    
    pub fn deposit(ctx: Context<Deposit>, token_amount: u64) -> Result<()> {
        return deposit::deposit(ctx, token_amount);
    }
    
    pub fn withdraw(ctx: Context<Withdraw>, token_amount: u64) -> Result<()> {
        return withdraw::withdraw(ctx, token_amount);
    }
}
