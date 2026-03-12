use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct UserState {
    pub token_index: u8,
    pub card_no: u8,
    pub stake_amount: u64,
    pub stake_time: u64,
    pub claim_amount: u64,
    pub claim_time: u64,
    pub lp_amount: u64
}