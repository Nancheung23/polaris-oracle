use anchor_lang::prelude::*;

use crate::{error::PolarisError, PlatformState, UserState, ADMIN, PLATFORM, USER};

#[derive(Accounts)]
pub struct ConsumeTicket<'info> {
    // user
    #[account(mut)]
    pub user: Signer<'info>,
    // team address
    #[account(
        address = ADMIN @PolarisError::UnauthorizedAdmin,
    )]
    pub authority: SystemAccount<'info>,

    // platform pda
    #[account(
        mut,
        seeds = [PLATFORM, authority.key().as_ref()],
        bump
    )]
    pub platform_pda: Account<'info, PlatformState>,
    // user pda
    #[account(
        mut,
        seeds = [USER, authority.key().as_ref(), user.key().as_ref()],
        bump
    )]
    pub user_pda: Account<'info, UserState>,
}

pub fn handler(ctx: Context<ConsumeTicket>) -> Result<()> {
    UserState::use_and_generate_id(&mut ctx.accounts.user_pda)?;

    ctx.accounts.platform_pda.total_service = ctx
        .accounts
        .platform_pda
        .total_service
        .checked_add(1)
        .unwrap();
    Ok(())
}
