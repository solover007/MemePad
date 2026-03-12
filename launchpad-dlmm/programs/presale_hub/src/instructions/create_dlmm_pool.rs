use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CreateDlmmPool<'info> {
    /// CHECK:
    pub funder: Signer<'info>,

    /// CHECK:
    #[account(mut)]
    pub lb_pair: UncheckedAccount<'info>,

    /// CHECK:
    #[account(mut)]
    // Add other account info fields as per your program logic
    pub reserve_x: UncheckedAccount<'info>,
    /// CHECK:
    #[account(mut)]
    pub reserve_y: UncheckedAccount<'info>,

    pub bin_array_bitmap_extension: Option<UncheckedAccount<'info>>,
    /// CHECK:
    #[account(mut)]
    pub token_mint_x: UncheckedAccount<'info>,
    /// CHECK:
    #[account(mut)]
    pub token_mint_y: UncheckedAccount<'info>,
    // Add other account info fields as per your program logic
    /// CHECK:
    #[account(mut)]
    pub oracle: UncheckedAccount<'info>,
    /// CHECK:
    #[account(mut)]
    pub preset_parameter: UncheckedAccount<'info>,

    pub rent: Sysvar<'info, Rent>,
    #[account(address = dlmm::ID)]
    /// CHECK: DLMM program
    pub dlmm_program: UncheckedAccount<'info>,

    /// CHECK: DLMM program event authority for event CPI
    pub event_authority: UncheckedAccount<'info>,

    /// CHECK: token program
    pub token_program: UncheckedAccount<'info>,

    /// CHECK: system program
    pub system_program: UncheckedAccount<'info>
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
pub fn create_dlmm_pool<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, CreateDlmmPool<'info>>,
    active_id: i32,
    bin_step: u16,
    // base_factor: u16,
) -> Result<()> {
    let accounts = dlmm::cpi::accounts::InitializeLbPair {
        lb_pair: ctx.accounts.lb_pair.to_account_info(),
        bin_array_bitmap_extension: ctx
            .accounts
            .bin_array_bitmap_extension
            .as_ref()
            .map(|account| account.to_account_info()),
        token_mint_x: ctx.accounts.token_mint_x.to_account_info(),
        token_mint_y: ctx.accounts.token_mint_y.to_account_info(),
        reserve_x: ctx.accounts.reserve_x.to_account_info(),
        reserve_y: ctx.accounts.reserve_y.to_account_info(),        
        oracle: ctx.accounts.oracle.to_account_info(),
        preset_parameter: ctx.accounts.preset_parameter.to_account_info(),        
        funder: ctx.accounts.funder.to_account_info(),
        token_program: ctx.accounts.token_program.to_account_info(),
        system_program: ctx.accounts.system_program.to_account_info(),
        rent: ctx.accounts.rent.to_account_info(),
        event_authority: ctx.accounts.event_authority.to_account_info(),
        program: ctx.accounts.dlmm_program.to_account_info(),
    };

    let cpi_context = CpiContext::new(ctx.accounts.dlmm_program.to_account_info(), accounts)
        .with_remaining_accounts(ctx.remaining_accounts.to_vec());
    dlmm::cpi::initialize_lb_pair(cpi_context, active_id, bin_step)
}
