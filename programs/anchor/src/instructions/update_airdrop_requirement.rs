use anchor_lang::prelude::*;

use crate::{error::PolarisError, PlatformState, ADMIN, PLATFORM};

#[derive(Accounts)]
pub struct UpdateAirdropRequirement<'info> {
    #[account(
        mut,
        constraint = operator.key() == platform_pda.operator @ PolarisError::UnauthorizedOperator
    )]
    pub operator: Signer<'info>,

    #[account(
        address = ADMIN @PolarisError::UnauthorizedAdmin
    )]
    pub authority: SystemAccount<'info>,
    #[account(
        mut,
        seeds = [PLATFORM, authority.key().as_ref()],
        bump
    )]
    pub platform_pda: Account<'info, PlatformState>,
}

pub fn handler(ctx: Context<UpdateAirdropRequirement>, requirement: u64) -> Result<()> {
    let platform = &mut ctx.accounts.platform_pda;
    // validation
    require!(requirement > 0, PolarisError::InvalidRequirement);
    PlatformState::update_airdrop_requirement(platform, requirement);
    Ok(())
}
