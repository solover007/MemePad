use anchor_lang::prelude::*;

use anchor_spl::token::Mint;

use crate::{constants::*, states::*};

#[derive(Accounts)]
#[instruction(
    quote_token_id: u8,
    new_price: u64,
)]
pub struct UpdatePrice<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [PRESALE_STATE_SEED, token_mint.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub presale_state: Box<Account<'info, PresaleState>>,

    #[account(mut)]
    pub token_mint: Account<'info, Mint>,
}

pub fn update_price(
    ctx: Context<UpdatePrice>,
    quote_token_id: u8,
    new_price: u64,
) -> Result<()> {
    let accts = ctx.accounts;
    let presale_state = &mut accts.presale_state;
    
    let old_price = presale_state.presale_price[quote_token_id as usize];
    presale_state.presale_price[quote_token_id as usize] = new_price;
    
    msg!("Presale price was updated for {} Quote Token from {} to {}", quote_token_id, old_price, new_price);

    Ok(())
}
