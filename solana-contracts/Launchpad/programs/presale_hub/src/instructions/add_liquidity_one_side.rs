use anchor_lang::prelude::*;
use anchor_spl::token::Token;

#[derive(Accounts)]
pub struct AddLiquidityOneSide<'info> {
    /// CHECK: position
    #[account(mut)]
    pub position: UncheckedAccount<'info, >,

    /// CHECK: lb_pair
    #[account(mut)]
    pub lb_pair: UncheckedAccount<'info, >,

    /// CHECK: bin_array_bitmap_extension
    #[account(mut)]
    pub bin_array_bitmap_extension: Option<UncheckedAccount<'info, >>,

    /// CHECK: user_token
    #[account(mut)]
    pub user_token: UncheckedAccount<'info, >,

    /// CHECK: reserve
    #[account(mut)]
    pub reserve: UncheckedAccount<'info, >,

    /// CHECK: token_mint
    pub token_mint: UncheckedAccount<'info, >,

    /// CHECK: bin_array_lower
    #[account(mut)]
    pub bin_array_lower: UncheckedAccount<'info, >,

    /// CHECK: bin_array_upper
    #[account(mut)]
    pub bin_array_upper: UncheckedAccount<'info, >,

    /// CHECK: sender
    pub sender: Signer<'info>,

    /// CHECK: token_program
    pub token_program: Program<'info, Token>,

    /// CHECK: DLMM program
    pub dlmm_program: UncheckedAccount<'info>,

    /// CHECK: DLMM program event authority for event CPI
    pub event_authority: UncheckedAccount<'info>,
}


pub fn add_liquidity_by_strategy_one_side<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, AddLiquidityOneSide<'info>>,
    liquidity_parameter: dlmm::instructions::add_liquidity_by_strategy_one_side::LiquidityParameterByStrategyOneSide,
) -> Result<()> {
    let accounts = dlmm::cpi::accounts::ModifyLiquidityOneSide {
        position: ctx.accounts.position.to_account_info(),
        lb_pair: ctx.accounts.lb_pair.to_account_info(),
        bin_array_bitmap_extension: ctx.accounts.
            bin_array_bitmap_extension.as_ref()
            .map(|account| account.to_account_info()),
        user_token: ctx.accounts.user_token.to_account_info(),
        reserve: ctx.accounts.reserve.to_account_info(),
        token_mint: ctx.accounts.token_mint.to_account_info(),
        bin_array_lower: ctx.accounts.bin_array_lower.to_account_info(),
        bin_array_upper: ctx.accounts.bin_array_upper.to_account_info(),
        sender: ctx.accounts.sender.to_account_info(),
        token_program: ctx.accounts.token_program.to_account_info(),
        program: ctx.accounts.dlmm_program.to_account_info(),
        event_authority: ctx.accounts.event_authority.to_account_info(),
    };

    let cpi_context = CpiContext::new(ctx.accounts.dlmm_program.to_account_info(), accounts)
        .with_remaining_accounts(ctx.remaining_accounts.to_vec());
    dlmm::cpi::add_liquidity_by_strategy_one_side(cpi_context, liquidity_parameter)
}

pub fn add_liquidity_one_side<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, AddLiquidityOneSide<'info>>,
    liquidity_parameter: dlmm::instructions::add_liquidity_by_weight_one_side::LiquidityOneSideParameter,
) -> Result<()> {
    let accounts = dlmm::cpi::accounts::ModifyLiquidityOneSide {
        position: ctx.accounts.position.to_account_info(),
        lb_pair: ctx.accounts.lb_pair.to_account_info(),
        bin_array_bitmap_extension: ctx.accounts.
            bin_array_bitmap_extension.as_ref()
            .map(|account| account.to_account_info()),
        user_token: ctx.accounts.user_token.to_account_info(),
        reserve: ctx.accounts.reserve.to_account_info(),
        token_mint: ctx.accounts.token_mint.to_account_info(),
        bin_array_lower: ctx.accounts.bin_array_lower.to_account_info(),
        bin_array_upper: ctx.accounts.bin_array_upper.to_account_info(),
        sender: ctx.accounts.sender.to_account_info(),
        token_program: ctx.accounts.token_program.to_account_info(),
        program: ctx.accounts.dlmm_program.to_account_info(),
        event_authority: ctx.accounts.event_authority.to_account_info(),
    };

    let cpi_context = CpiContext::new(ctx.accounts.dlmm_program.to_account_info(), accounts)
        .with_remaining_accounts(ctx.remaining_accounts.to_vec());
    dlmm::cpi::add_liquidity_one_side(cpi_context, liquidity_parameter)
}
