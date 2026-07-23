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
        bump,
        constraint = !platform_pda.paused @ PolarisError::PlatformPaused
    )]
    pub platform_pda: Account<'info, PlatformState>,
    // user pda
    #[account(
        mut,
        seeds = [USER, authority.key().as_ref(), user.key().as_ref()],
        bump,
    )]
    pub user_pda: Account<'info, UserState>,
}

pub fn handler(ctx: Context<ConsumeTicket>) -> Result<()> {
    // consume ticket
    UserState::use_and_generate_id(&mut ctx.accounts.user_pda)?;
    // update platform service
    PlatformState::add_service(&mut ctx.accounts.platform_pda);
    emit!(ConsumeTicketEvent {
        user: ctx.accounts.user.key(),
        order_id: ctx.accounts.user_pda.last_order_id,
        timestamp: Clock::get()?.unix_timestamp,
    });
    Ok(())
}

#[event]
pub struct ConsumeTicketEvent {
    pub user: Pubkey,
    pub order_id: u64,
    pub timestamp: i64,
}
