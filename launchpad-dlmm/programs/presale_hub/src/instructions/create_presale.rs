use anchor_lang::prelude::*;

use solana_program::{program::invoke, system_instruction};

use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};

use crate::{constants::*, errors::*, states::*};

#[derive(Accounts)]
pub struct CreatePresale<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + std::mem::size_of::<PresaleState>(),
        seeds = [PRESALE_STATE_SEED.as_ref(), token_mint.key().as_ref()],
        bump
    )]
    pub presale_state: Box<Account<'info, PresaleState>>,

    /// CHECK: vault is presale vault
    #[account(
        mut,
        seeds = [VAULT_SEED.as_ref(), presale_state.key().as_ref()],
        bump
    )]
    pub vault: AccountInfo<'info>,

    #[account(
        init,
        associated_token::mint = token_mint,
        associated_token::authority = presale_state,
        payer = authority
    )]
    pub token_vault: Account<'info, TokenAccount>,

    #[account(mut)]
    pub token_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>
}

pub fn create_presale(
    ctx: Context<CreatePresale>,
    token_mint_address: Pubkey,
    // quote_token_mint_address: Pubkey,
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
    let accts = ctx.accounts;
    let presale_state = &mut accts.presale_state;
    
    let cur_timestamp = Clock::get()?.unix_timestamp as u64;

    require!(
        presale_state.state == 0,
        PresaleError::AlreadyCreated
    );
    require!(
        softcap_amount < hardcap_amount,
        PresaleError::InvalidParams1
    );
    require!(
        start_time < end_time,
        PresaleError::InvalidParams2
    );
    require!(
        min_buy < max_buy,
        PresaleError::InvalidParams3
    );
    require!(
        cur_timestamp < start_time,
        PresaleError::InvalidStartTime
    );


    msg!{"whitelisted_tokens = {:?}", whitelisted_tokens};

    presale_state.token_mint_address = token_mint_address;
    // presale_state.quote_token_mint_address = quote_token_mint_address;
    presale_state.softcap_amount = softcap_amount;
    presale_state.hardcap_amount = hardcap_amount;
    presale_state.start_time = start_time;
    presale_state.end_time = end_time;
    presale_state.presale_price = presale_price;
    presale_state.listing_price = listing_price;
    presale_state.lp_percent = lp_percent;
    presale_state.is_auto_listing = is_auto_listing;
    presale_state.lock_period = lock_period;
    presale_state.min_buy = min_buy;
    presale_state.max_buy = max_buy;
    presale_state.refund_type = refund_type;

    presale_state.vault = accts.vault.key();
    presale_state.token_vault = accts.token_vault.key();
    presale_state.authority = accts.authority.key();
    presale_state.whitelisted_tokens = whitelisted_tokens;
    presale_state.valid_whitelist_token_count = valid_token_count;

    if is_vesting > 0 {
        presale_state.is_vesting = is_vesting;
        presale_state.tge_date = tge_date;
        presale_state.tge_percent = tge_percent;
        presale_state.cycle_days = cycle_days;
        presale_state.cycle_release_percent = cycle_release_percent;
    }
    presale_state.pad_fee_pct = pad_fee_pct;

    let rent = Rent::default();
    let required_lamports = rent
        .minimum_balance(0)
        .max(1)
        .saturating_sub(accts.vault.to_account_info().lamports());
    msg!("required lamports = {:?}", required_lamports);
    invoke(
        &system_instruction::transfer(
            &accts.authority.key(),
            &accts.vault.key(),
            required_lamports,
        ),
        &[
            accts.authority.to_account_info().clone(),
            accts.vault.clone(),
            accts.system_program.to_account_info().clone(),
        ],
    )?;

    presale_state.state = 1;

    msg!("Presale has created for token: {}", token_mint_address);

    Ok(())
}
