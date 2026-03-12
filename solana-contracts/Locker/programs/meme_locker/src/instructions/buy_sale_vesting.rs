use crate::{constants::*, errors::*, states::*};
use anchor_lang::prelude::*;
use solana_program::{
    program::invoke,
    system_instruction
};
use anchor_spl::token::Mint;

#[derive(Accounts)]
#[instruction(
    vesting_id: u8,
    amount: u64
)]
pub struct BuySaleVesting<'info> {
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
        constraint = seller_vault.key() == seller_lp_state.authority
    )]
    /// CHECK: this should be checked by owner
    pub seller_vault: AccountInfo<'info>,

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
    ctx: Context<BuySaleVesting>,
    vesting_id: u8,
    amount: u64,
    bid_price: u64
) -> Result<()> {
    let accts = ctx.accounts;
    let seller = &mut accts.seller_lp_state;
    let buyer = &mut accts.buyer_lp_state;
    
    require!(
        seller.sale_vesting_count > vesting_id,
        LockerError::InvalidId
    );

    // let cur_vesting = accts.buyer_lp_state.vests[vesting_id as usize];
    // let cur_sale_vesting = &mut accts.buyer_lp_state.sale_vests[vesting_id as usize];

    require!(
        seller.sale_vests[vesting_id as usize].amount >= amount,
        LockerError::InsufficientBalance
    );
    
    let cur_timestamp = Clock::get()?.unix_timestamp as u64;
    
    if seller.sale_vests[vesting_id as usize].immediate_price <= bid_price {

        let mut sol_amount = amount * bid_price;
        sol_amount -= sol_amount * accts.global_state.marketplace_fee / DENOMINATOR;

        // Send Sol: buyer -> seller
        invoke(
            &system_instruction::transfer(
                &accts.user.key(),
                &accts.seller_vault.key(),
                sol_amount,
            ),
            &[
                accts.user.to_account_info().clone(),
                accts.seller_vault.to_account_info().clone(),
                accts.system_program.to_account_info().clone(),
            ],
        )?;
        
        // add vesting to buyer
        let index = buyer.vesting_count as usize;

        buyer.vests[index] = VestingState {
            plan: seller.vests[seller.sale_vests[vesting_id as usize].original_id as usize].plan.clone(),
            current_amount: amount,
            created_at: cur_timestamp
        };
        
        buyer.vesting_count += 1;

        if seller.sale_vests[vesting_id as usize].amount > amount {
            seller.sale_vests[vesting_id as usize].amount -= amount;
        } else {
            // remove sale vesting from seller
            seller.sale_vests[vesting_id as usize] = seller.sale_vests[(seller.sale_vesting_count - 1) as usize].clone();
            seller.sale_vesting_count -= 1;
        }
    } else {
        if seller.sale_vests[vesting_id as usize].max_bid_price < bid_price {
            seller.sale_vests[vesting_id as usize].max_bid_price = bid_price;
            seller.sale_vests[vesting_id as usize].max_price_bidder = accts.user.key();

            // Send Sol: buyer -> contract vault (escrow)
            invoke(
                &system_instruction::transfer(
                    &accts.user.key(),
                    &accts.vault.key(),
                    amount * bid_price,
                ),
                &[
                    accts.user.to_account_info().clone(),
                    accts.vault.to_account_info().clone(),
                    accts.system_program.to_account_info().clone(),
                ],
            )?;
        } else {
            // return
        }
    }

    msg!("Successfully bought {} tokens", amount);
    
    Ok(())
}