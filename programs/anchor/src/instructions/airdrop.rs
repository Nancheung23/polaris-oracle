use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{Mint, TokenAccount, TokenInterface},
};

use crate::{error::PolarisError, PlatformState, ADMIN, PLATFORM};

#[derive(Accounts)]
pub struct Airdrop<'info> {
    // operator
    #[account(
        mut,
        constraint = operator.key() == platform_pda.operator @ PolarisError::UnauthorizedOperator,
    )]
    pub operator: Signer<'info>,

    #[account(
        address = ADMIN @ PolarisError::UnauthorizedAdmin,
    )]
    // team address
    pub authority: SystemAccount<'info>,
    // airdrop receiver
    pub user: SystemAccount<'info>,
    // mint token
    pub mint: InterfaceAccount<'info, Mint>,
    // platform pda
    #[account(
        seeds = [PLATFORM, authority.key().as_ref()],
        bump
    )]
    pub platform_pda: Account<'info, PlatformState>,
    // vault ata
    #[account(
        associated_token::mint = mint,
        associated_token::authority = platform_pda,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,
    // user ata
    #[account(
        associated_token::mint = mint,
        associated_token::authority = user,
    )]
    pub user_ata: InterfaceAccount<'info, TokenAccount>,
    // program
    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}
