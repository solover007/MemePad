use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct GlobalState {
    // Global variable to start
    pub is_initialized: u8,

    // Authority of launchpad
    pub authority: Pubkey,
    
    // treasury of launchpad
    pub treasury: Pubkey
}