use anchor_lang::prelude::*;
use crate::{states::*};

pub fn quote_to_sol(presale_state: &PresaleState, quote_token_id: u8, quote_token_amount: u128) -> Result<u64> {
    let quote_token_price = presale_state.presale_price[quote_token_id as usize] as u128;
    let sol_price = presale_state.presale_price[0] as u128;

    //let res = quote_token_amount * quote_token_price / sol_price; // corresponding SOL amount for Quote token
    let res = quote_token_amount
        .checked_mul(quote_token_price)
        .unwrap()
        .checked_div(sol_price)
        .unwrap();

    msg!("calculated sol amount {} for quote token {} amount of {}", res, quote_token_id, quote_token_amount);
    
    Ok(res as u64)
}