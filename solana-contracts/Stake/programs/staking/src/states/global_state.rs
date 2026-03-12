use anchor_lang::prelude::*;
use crate::{constants::*};

#[account]
#[derive(Default)]
pub struct GlobalState {
    // to avoid reinitialization attack
    pub is_initialized: u8,
    // admin
    pub authority: Pubkey,
    // vault
    pub vault: Pubkey,
    // treasury
    pub treasury: Pubkey,
    
    // these are constants
    pub stake_fee: u64,
    pub unstake_fee: u64,
    pub claim_fee: u64,
    pub ref_fee: u64,
    
    pub deposit_amount: u64,
    
    // Staking is started
    pub is_started: u8,

    // Whitelisted staking tokens
    pub whitelisted_tokens: [Pubkey; MAX_WHITELISTED_TOKENS],
    // 0: MPAD
    // 1: WSOL
    // 2~: Other SPL tokens
}
