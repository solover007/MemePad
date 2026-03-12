use crate::{constants::*, errors::*, states::*};
use anchor_lang::prelude::*;
use solana_program::{
    program::invoke_signed,
    system_instruction
};
use anchor_spl::token::{self, Mint, Token};

#[derive(Accounts)]
pub struct ApproveSaleVesting<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        mut,
        seeds = [VAULT_SEED, global_state.key().as_ref()],
        bump
    )]
    /// CHECK: sol vault treasury
    pub vault: AccountInfo<'info>,

    #[account(
        mut,
        seeds = [USER_STATE_SEED, user.key().as_ref(), token_mint.key().as_ref()],
        bump
    )]
    pub seller_lp_state: Account<'info, UserLpState>,

    #[account(
        mut,
        seeds = [USER_STATE_SEED, user.key().as_ref(), token_mint.key().as_ref()],
        bump
    )]
    pub buyer_lp_state: Account<'info, UserLpState>,
    
    pub token_mint: Box<Account<'info, Mint>>,
    
    pub system_program: Program<'info, System>,
}

pub fn handle(
    ctx: Context<ApproveSaleVesting>,
    sale_vesting_id: u8,
) -> Result<()> {
    let accts = ctx.accounts;
    let seller = &mut accts.seller_lp_state;
    let buyer = &mut accts.buyer_lp_state;
    
    require!(
        seller.sale_vesting_count > sale_vesting_id,
        LockerError::InvalidId
    );

    let cur_timestamp = Clock::get()?.unix_timestamp as u64;

    let bump = ctx.bumps.vault;
    let global_key = accts.global_state.key();
    let vault_seed: &[&[&[u8]]] = &[&[VAULT_SEED, global_key.as_ref(), &[bump]]];

    let mut sol_amount = seller.sale_vests[sale_vesting_id as usize].amount * seller.sale_vests[sale_vesting_id as usize].max_bid_price;
    sol_amount -= sol_amount * accts.global_state.marketplace_fee / DENOMINATOR;
    
    // Send Sol: contract vault (escrow) -> Seller
    invoke_signed(
        &system_instruction::transfer(
            &accts.vault.key(),
            &accts.user.key(),
            sol_amount,
        ),
        &[
            accts.vault.to_account_info().clone(),
            accts.user.to_account_info().clone(),
            accts.system_program.to_account_info().clone(),
        ],
        vault_seed
    )?;
    
    // add vesting to buyer
    let index = buyer.vesting_count as usize;

    buyer.vests[index] = VestingState {
        plan: seller.vests[seller.sale_vests[sale_vesting_id as usize].original_id as usize].plan.clone(),
        current_amount: seller.sale_vests[sale_vesting_id as usize].amount,
        created_at: cur_timestamp
    };
    
    buyer.vesting_count += 1;

    msg!("Successfully bought {} tokens", seller.sale_vests[sale_vesting_id as usize].amount);

    // remove sale vesting from seller
    seller.sale_vests[sale_vesting_id as usize] = seller.sale_vests[(seller.sale_vesting_count - 1) as usize].clone();
    seller.sale_vesting_count -= 1;
    
    Ok(())
}
