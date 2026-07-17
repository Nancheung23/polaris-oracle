use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{self, Mint, TokenAccount, TokenInterface},
};

use crate::{error::PolarisError, PlatformState, ADMIN, PLATFORM};

#[derive(Accounts)]
pub struct Withdraw<'info> {
    // team wallet
    #[account(
        address = ADMIN @PolarisError::UnauthorizedAdmin,
    )]
    pub authority: Signer<'info>,
    // mint token
    pub mint: InterfaceAccount<'info, Mint>,
    // platform pda
    #[account(
        seeds = [PLATFORM, authority.key().as_ref()],
        bump
    )]
    pub platform_pda: Account<'info, PlatformState>,
    // vault
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = platform_pda,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,
    // team wallet ata
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = authority,
    )]
    pub authority_ata: InterfaceAccount<'info, TokenAccount>,
    // programs
    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

pub fn handler(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    // check withdraw amount
    let withdraw_amount = std::cmp::min(amount, ctx.accounts.vault.amount);
    if withdraw_amount == 0 {
        msg!("vault amount: 0");
        return Ok(());
    }
    let cpi_program = ctx.accounts.token_program.to_account_info();
    // ctx accounts
    let cpi_accounts = token_interface::TransferChecked {
        from: ctx.accounts.vault.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.authority_ata.to_account_info(),
        authority: ctx.accounts.platform_pda.to_account_info(),
    };

    // combine seeds
    let seed = &[
        PLATFORM,
        ctx.accounts.authority.key.as_ref(),
        &[ctx.accounts.platform_pda.bump],
    ];
    let signer_seeds = &[&seed[..]];

    // trasfer
    let cpi_ctx = CpiContext::new_with_signer(cpi_program.key(), cpi_accounts, signer_seeds);
    token_interface::transfer_checked(cpi_ctx, withdraw_amount, ctx.accounts.mint.decimals)?;
    Ok(())
}
