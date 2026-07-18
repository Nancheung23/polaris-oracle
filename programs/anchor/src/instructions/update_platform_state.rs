use anchor_lang::prelude::*;

use crate::{error::PolarisError, PlatformState, ADMIN, PLATFORM};

#[derive(Accounts)]
pub struct UpdatePlatformState<'info> {
    // team wallet
    #[account(
        address = ADMIN @PolarisError::UnauthorizedAdmin,
    )]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [PLATFORM, authority.key().as_ref()],
        bump
    )]
    pub platform_pda: Account<'info, PlatformState>,
}

pub fn handler(
    ctx: Context<UpdatePlatformState>,
    price: Option<u64>,
    rate: Option<u8>,
    // pasued: Option<bool>,
    new_operator: Option<Pubkey>,
) -> Result<()> {
    let platform = &mut ctx.accounts.platform_pda;
    if let Some(new_price) = price {
        platform.price = new_price;
    }
    if let Some(new_rate) = rate {
        require!(new_rate <= 100, PolarisError::InvalidRate);
        platform.rate = new_rate;
    }
    // if let Some(new_paused) = pasued {
    //     platform.paused = new_paused;
    // }
    if let Some(new_operator) = new_operator {
        platform.operator = new_operator;
    }
    Ok(())
}
