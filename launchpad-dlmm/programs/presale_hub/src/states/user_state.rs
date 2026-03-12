use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
#[derive(Default)]
pub struct UserState {
    pub buy_token_amount: u64,
    pub buy_quote_token_amount: [u64; MAX_WHITELISTED_TOKENS],
    pub buy_time: u64,
    pub claim_amount: u64,
    pub claim_time: u64
}