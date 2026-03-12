use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
#[derive(Default)]
pub struct PresaleState {
    // Authority of Presale
    pub authority: Pubkey,

    // vault to save SOL
    pub vault: Pubkey,

    // Mint address of presale token
    pub token_mint_address: Pubkey,

    // Mint token ATA
    pub token_vault: Pubkey,

    // Mint address of quote token
    // pub quote_token_mint_address: Pubkey,

    // Quote tokens' ATA
    pub quote_token_vaults: [Pubkey; MAX_WHITELISTED_TOKENS],

    // Softcap
    pub softcap_amount: u64,

    // Hardcap
    pub hardcap_amount: u64,

    // Start time of presale
    pub start_time: u64,

    // End time of presale
    pub end_time: u64,

    // Presale price of token
    pub presale_price: [u64; MAX_WHITELISTED_TOKENS],

    // Listing price of token
    pub listing_price: u64,

    // Quote token is Sol or not
    // pub is_quote_sol: bool,

    // Sold token amount
    pub sold_token_amount: u64,

    // total claimed amount of contract
    pub claim_token_amount: u64,

    // total deposited amount of contract
    pub deposit_token_amount: u64,

    // Quote token amount of contract
    pub quote_token_amount: [u64; MAX_WHITELISTED_TOKENS],

    // Presale Card is created
    // pub is_initialized: bool,

    // Liquidity percent max:100%
    pub lp_percent: u64,

    // Auto listing
    pub is_auto_listing: bool,

    // RefundType 0: Burn, 1: Refund
    pub refund_type: u8,

    // LP lock period
    pub lock_period: u64,

    // minimum buy amount(quote token)
    pub min_buy: u64,

    // maximum buy amount(quote token)
    pub max_buy: u64,

    // total participants
    pub holders: u64,

    // state
    pub state: u8, // 0: not started, 1: started, 2: finished, 3: finalized, 4: claimable

    // token release way: 0_total release, 1_vesting release
    pub is_vesting: u8,

    // first release time
    pub tge_date: u64,

    // first release amount(percent)
    pub tge_percent: u64,

    // period between cycles
    pub cycle_days: u64,

    // release amount between cycles(percent)
    pub cycle_release_percent: u64,

    // pad fee: percent of raised sol. ex: 5% = 0.05 * DENOMINATOR
    pub pad_fee_pct: u64,
    
    // valid whitelist token count, default 2, 0: WSOL, 1: GUMMY
    pub valid_whitelist_token_count: u8,

    // whitelisted token list
    pub whitelisted_tokens: [Pubkey; MAX_WHITELISTED_TOKENS],
    
    // LP pair was created
    pub lp_created: [u8; MAX_WHITELISTED_TOKENS],
    
    // SOL amount to create LP
    pub lp_threshold: u64,
}
