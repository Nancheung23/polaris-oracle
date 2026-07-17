use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{self, Mint, TokenAccount, TokenInterface},
};

use crate::{error::PolarisError, PlatformState, UserState, ADMIN, DISCRIMNATOR, PLATFORM, USER};

#[derive(Accounts)]
pub struct BuyTicket<'info> {
    // signer is user: transfer token for ticket
    #[account(mut)]
    pub user: Signer<'info>,
    // team account
    #[account(
        address = ADMIN @PolarisError::UnauthorizedAdmin,
    )]
    pub authority: SystemAccount<'info>,

    // mint token
    #[account(mut)]
    pub mint: InterfaceAccount<'info, Mint>,

    // platform pda
    #[account(
        mut,
        seeds = [PLATFORM, authority.key().as_ref()],
        bump
    )]
    pub platform_pda: Account<'info, PlatformState>,
    // user pda
    #[account(
        init_if_needed,
        payer = user,
        space = DISCRIMNATOR + UserState::INIT_SPACE,
        seeds = [USER, authority.key().as_ref(), user.key().as_ref()],
        bump
    )]
    pub user_pda: Account<'info, UserState>,

    // user ata
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = user,
    )]
    pub user_ata: InterfaceAccount<'info, TokenAccount>,
    // vault
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = platform_pda,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,

    // program
    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

pub fn handler(ctx: Context<BuyTicket>) -> Result<()> {
    require!(
        ctx.accounts.platform_pda.paused == false,
        PolarisError::PlatformPaused
    );
    // cpi program
    let cpi_program = ctx.accounts.token_program.to_account_info();
    // check if there's any data for user pda
    let is_initialized = ctx.accounts.user_pda.owner != Pubkey::default();

    // if hasn't initialized, set inner
    if !is_initialized {
        ctx.accounts.user_pda.set_inner(UserState {
            owner: ctx.accounts.user.key(),
            tickets: 0,
            total_consume: 0,
            total_service: 0,
            last_order_id: 0,
            timestamp: Clock::get()?.unix_timestamp,
            bump: ctx.bumps.user_pda,
        });
    }

    // user ata transfer tokens to vault
    let cpi_accounts = token_interface::TransferChecked {
        from: ctx.accounts.user_ata.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.vault.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };
    let cpi_burn_accounts = token_interface::Burn {
        mint: ctx.accounts.mint.to_account_info(),
        from: ctx.accounts.user_ata.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };

    // context
    let cpi_ctx = CpiContext::new(cpi_program.key(), cpi_accounts);
    let cpi_burn_ctx = CpiContext::new(cpi_program.key(), cpi_burn_accounts);

    // calculate burn and transfer amount
    let cpi_amount = ctx.accounts.platform_pda.price;
    let (cpi_burn_amount, cpi_transfer_amount) =
        PlatformState::calculate_service(&ctx.accounts.platform_pda);

    // burn
    if cpi_burn_amount > 0 {
        token_interface::burn(cpi_burn_ctx, cpi_burn_amount)?;
    }
    // transfer if not 100% burnt
    if cpi_transfer_amount > 0 {
        token_interface::transfer_checked(
            cpi_ctx,
            cpi_transfer_amount,
            ctx.accounts.mint.decimals,
        )?;
    }

    // update user
    // update ticket amount
    ctx.accounts.user_pda.tickets = ctx.accounts.user_pda.tickets.checked_add(1).unwrap();
    // update total_consume
    UserState::new_order(&mut ctx.accounts.user_pda, cpi_amount);

    // update platform
    // update total_consume
    ctx.accounts.platform_pda.total_consume = ctx
        .accounts
        .platform_pda
        .total_consume
        .checked_add(cpi_amount)
        .unwrap();
    // update total_burnt
    ctx.accounts.platform_pda.total_burnt = ctx
        .accounts
        .platform_pda
        .total_burnt
        .checked_add(cpi_burn_amount)
        .unwrap();
    Ok(())
}
