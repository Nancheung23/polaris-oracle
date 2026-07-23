use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{Mint, TokenAccount, TokenInterface},
};

use crate::{constants, error::PolarisError};
use crate::{PlatformState, ADMIN, DISCRIMNATOR, PLATFORM};

// Instruction: Initialize, set up platform_state pda and create its ata
#[derive(Accounts)]
pub struct Initialize<'info> {
    // dev wallet (verify if it's admin)
    #[account(
        mut,
        address = ADMIN @PolarisError::UnauthorizedAdmin,
    )]
    pub authority: Signer<'info>,
    // mint address
    pub mint: InterfaceAccount<'info, Mint>,
    // platform state pda
    #[account(
        init,
        payer = authority,
        space = DISCRIMNATOR + PlatformState::INIT_SPACE,
        seeds = [PLATFORM, authority.key().as_ref()],
        bump,
    )]
    pub platform_pda: Account<'info, PlatformState>,
    // vault
    #[account(
        init,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = platform_pda,
        associated_token::token_program = token_program,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,

    // program
    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

pub fn handler(
    ctx: Context<Initialize>,
    price: u64,
    rate: u8,
    airdrop_requirement: u64,
    new_operator: Option<Pubkey>,
) -> Result<()> {
    // determine operator wallet
    let operator = match new_operator {
        Some(operator) => operator,
        _ => constants::OPERATOR,
    };
    // initialize PlatformState PDA
    ctx.accounts.platform_pda.set_inner(PlatformState {
        authority: ctx.accounts.authority.key(),
        mint: ctx.accounts.mint.key(),
        vault: ctx.accounts.vault.key(),
        operator: operator,
        price,
        rate,
        total_consume: 0,
        total_service: 0,
        airdrop_requirement: airdrop_requirement,
        total_burnt: 0,
        paused: false,
        bump: ctx.bumps.platform_pda,
    });
    Ok(())
}
