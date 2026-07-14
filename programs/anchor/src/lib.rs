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

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::handler(ctx)
    }
}
