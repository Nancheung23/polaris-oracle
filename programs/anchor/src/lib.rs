pub mod constants;
pub mod error;
pub mod instructions;
pub mod states;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use states::*;

declare_id!("6rCqKLmJSCjrojzUgKWMiuohk15rxbTMeKRbGF5XcZJA");

#[program]
pub mod anchor {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        price: u64,
        rate: u8,
        airdrop_requirement: u64,
        new_operator: Option<Pubkey>,
    ) -> Result<()> {
        initialize::handler(ctx, price, rate, airdrop_requirement, new_operator)
    }

    pub fn buy_ticket(ctx: Context<BuyTicket>) -> Result<()> {
        buy_ticket::handler(ctx)
    }

    pub fn consume_ticket(ctx: Context<ConsumeTicket>) -> Result<()> {
        consume_ticket::handler(ctx)
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        withdraw::handler(ctx, amount)
    }

    pub fn update_platform_state(
        ctx: Context<UpdatePlatformState>,
        price: Option<u64>,
        rate: Option<u8>,
        // paused: Option<bool>,
        new_operator: Option<Pubkey>,
    ) -> Result<()> {
        update_platform_state::handler(ctx, price, rate, new_operator)
    }

    pub fn pause_platform(ctx: Context<PausePlatform>, paused: bool) -> Result<()> {
        pause_platform::handler(ctx, paused)
    }
}
