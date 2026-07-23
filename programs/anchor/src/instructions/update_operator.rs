use anchor_lang::prelude::*;

use crate::{error::PolarisError, PlatformState, ADMIN, PLATFORM};

#[derive(Accounts)]
pub struct UpdateOperator<'info> {
    #[account(
        address = ADMIN @PolarisError::UnauthorizedAdmin
    )]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [PLATFORM, authority.key().as_ref()],
        bump
    )]
    pub platform_pda: Account<'info, PlatformState>,
}

pub fn handler(ctx: Context<UpdateOperator>, new_operator: Pubkey) -> Result<()> {
    require!(
        new_operator != Pubkey::default(),
        PolarisError::InvalidNewOperator
    );
    let platform = &mut ctx.accounts.platform_pda;
    PlatformState::update_operator(platform, new_operator);
    Ok(())
}
