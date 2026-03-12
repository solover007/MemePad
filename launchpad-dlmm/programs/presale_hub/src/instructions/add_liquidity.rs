use anchor_lang::prelude::*;
use anchor_spl::token::Token;

#[derive(Accounts)]
pub struct AddLiquidity<'info> {
    /// CHECK: position
    #[account(mut)]
    pub position: UncheckedAccount<'info,>,

    /// CHECK: lb_pair
    #[account(mut)]
    pub lb_pair: UncheckedAccount<'info,>,

    /// CHECK: bin_array_bitmap_extension
    #[account(mut)]
    pub bin_array_bitmap_extension: Option<UncheckedAccount<'info,>>,

    /// CHECK: user_token_x
    #[account(mut)]
    pub user_token_x: UncheckedAccount<'info,>,

    /// CHECK: user_token_y
    #[account(mut)]
    pub user_token_y: UncheckedAccount<'info,>,

    /// CHECK: reserve_x
    #[account(mut)]
    pub reserve_x: UncheckedAccount<'info,>,
    /// CHECK: reserve_y
    #[account(mut)]
    pub reserve_y: UncheckedAccount<'info,>,

    /// CHECK: token_x_mint
    pub token_x_mint: UncheckedAccount<'info,>,
    /// CHECK: token_y_mint
    pub token_y_mint: UncheckedAccount<'info,>,

    /// CHECK: bin_array_lower
    #[account(mut)]
    pub bin_array_lower: UncheckedAccount<'info,>,
    /// CHECK: bin_array_upper
    #[account(mut)]
    pub bin_array_upper: UncheckedAccount<'info,>,

    /// CHECK: sender
    pub sender: Signer<'info>,
    /// CHECK: token_x_program
    pub token_x_program: Program<'info, Token>,
    /// CHECK: token_y_program
    pub token_y_program: Program<'info, Token>,
    /// CHECK: DLMM program
    pub dlmm_program: UncheckedAccount<'info>,

    /// CHECK: DLMM program event authority for event CPI
    pub event_authority: UncheckedAccount<'info>,
}

/// Executes a create dlmm pool
///
/// # Arguments
///
/// * `ctx` - The context containing accounts and programs.
/// * `active_id` - The amount of input tokens to be swapped.
/// * `bin_step` - The minimum amount of output tokens expected a.k.a slippage
///
/// # Returns
///
/// Returns a `Result` indicating success or failure.
pub fn add_liquidity<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, AddLiquidity<'info>>,
    liquidity_parameter: dlmm::instructions::add_liquidity::LiquidityParameter,
) -> Result<()> {
    let accounts = dlmm::cpi::accounts::ModifyLiquidity {
        position: ctx.accounts.position.to_account_info(),
        lb_pair: ctx.accounts.lb_pair.to_account_info(),
        bin_array_bitmap_extension: ctx.accounts.
            bin_array_bitmap_extension.as_ref()
            .map(|account| account.to_account_info()),
        user_token_x: ctx.accounts.user_token_x.to_account_info(),
        user_token_y: ctx.accounts.user_token_y.to_account_info(),
        reserve_x: ctx.accounts.reserve_x.to_account_info(),
        reserve_y: ctx.accounts.reserve_y.to_account_info(),
        token_x_mint: ctx.accounts.token_x_mint.to_account_info(),
        token_y_mint: ctx.accounts.token_y_mint.to_account_info(),
        bin_array_lower: ctx.accounts.bin_array_lower.to_account_info(),
        bin_array_upper: ctx.accounts.bin_array_upper.to_account_info(),
        sender: ctx.accounts.sender.to_account_info(),
        token_x_program: ctx.accounts.token_x_program.to_account_info(),
        token_y_program: ctx.accounts.token_y_program.to_account_info(),
        program: ctx.accounts.dlmm_program.to_account_info(),
        event_authority: ctx.accounts.event_authority.to_account_info(),
    };

    let cpi_context = CpiContext::new(ctx.accounts.dlmm_program.to_account_info(), accounts)
        .with_remaining_accounts(ctx.remaining_accounts.to_vec());
    
    dlmm::cpi::add_liquidity(cpi_context, liquidity_parameter)
}

pub fn add_liquidity_by_weight<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, AddLiquidity<'info>>,
    liquidity_parameter: dlmm::instructions::add_liquidity_by_weight::LiquidityParameterByWeight,
) -> Result<()> {
    let accounts = dlmm::cpi::accounts::ModifyLiquidity {
        position: ctx.accounts.position.to_account_info(),
        lb_pair: ctx.accounts.lb_pair.to_account_info(),
        bin_array_bitmap_extension: ctx.accounts.
            bin_array_bitmap_extension.as_ref()
            .map(|account| account.to_account_info()),
        user_token_x: ctx.accounts.user_token_x.to_account_info(),
        user_token_y: ctx.accounts.user_token_y.to_account_info(),
        reserve_x: ctx.accounts.reserve_x.to_account_info(),
        reserve_y: ctx.accounts.reserve_y.to_account_info(),
        token_x_mint: ctx.accounts.token_x_mint.to_account_info(),
        token_y_mint: ctx.accounts.token_y_mint.to_account_info(),
        bin_array_lower: ctx.accounts.bin_array_lower.to_account_info(),
        bin_array_upper: ctx.accounts.bin_array_upper.to_account_info(),
        sender: ctx.accounts.sender.to_account_info(),
        token_x_program: ctx.accounts.token_x_program.to_account_info(),
        token_y_program: ctx.accounts.token_y_program.to_account_info(),
        program: ctx.accounts.dlmm_program.to_account_info(),
        event_authority: ctx.accounts.event_authority.to_account_info(),
    };

    let cpi_context = CpiContext::new(ctx.accounts.dlmm_program.to_account_info(), accounts)
        .with_remaining_accounts(ctx.remaining_accounts.to_vec());
    
    dlmm::cpi::add_liquidity_by_weight(cpi_context, liquidity_parameter)
}

pub fn add_liquidity_by_strategy<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, AddLiquidity<'info>>,
    liquidity_parameter: dlmm::instructions::add_liquidity_by_strategy::LiquidityParameterByStrategy,
) -> Result<()> {
    let accounts = dlmm::cpi::accounts::ModifyLiquidity {
        position: ctx.accounts.position.to_account_info(),
        lb_pair: ctx.accounts.lb_pair.to_account_info(),
        bin_array_bitmap_extension: ctx.accounts.
            bin_array_bitmap_extension.as_ref()
            .map(|account| account.to_account_info()),
        user_token_x: ctx.accounts.user_token_x.to_account_info(),
        user_token_y: ctx.accounts.user_token_y.to_account_info(),
        reserve_x: ctx.accounts.reserve_x.to_account_info(),
        reserve_y: ctx.accounts.reserve_y.to_account_info(),
        token_x_mint: ctx.accounts.token_x_mint.to_account_info(),
        token_y_mint: ctx.accounts.token_y_mint.to_account_info(),
        bin_array_lower: ctx.accounts.bin_array_lower.to_account_info(),
        bin_array_upper: ctx.accounts.bin_array_upper.to_account_info(),
        sender: ctx.accounts.sender.to_account_info(),
        token_x_program: ctx.accounts.token_x_program.to_account_info(),
        token_y_program: ctx.accounts.token_y_program.to_account_info(),
        program: ctx.accounts.dlmm_program.to_account_info(),
        event_authority: ctx.accounts.event_authority.to_account_info(),
    };

    let cpi_context = CpiContext::new(ctx.accounts.dlmm_program.to_account_info(), accounts)
        .with_remaining_accounts(ctx.remaining_accounts.to_vec());
    dlmm::cpi::add_liquidity_by_strategy(cpi_context, liquidity_parameter)
}
