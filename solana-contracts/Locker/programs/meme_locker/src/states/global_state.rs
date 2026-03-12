use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct GlobalState {
    pub is_initialized: u8,
    pub is_started: u8,
    
    // admin
    pub authority: Pubkey,
    
    // SOL vault
    pub vault: Pubkey,

    pub token_mint: Pubkey,
    pub token_vault: Pubkey,

    //PENALTY_FEE
    pub penalty_fee: u64,
    
    //MARKETPLACE_FEE
    pub marketplace_fee: u64,
}
