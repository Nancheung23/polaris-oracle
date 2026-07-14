use anchor_lang::prelude::*;

#[constant]
pub const SEED: &str = "anchor";
pub const DISCRIMNATOR: usize = 8;
pub const PLATFORM: &[u8; 8] = b"platform";

/// Only this address is allowed to initialize a `PlatformState`.
pub const ADMIN: Pubkey = pubkey!("HNZsqu8wnc1kmRBxeFAT91ka9KBtvZ7vkELN5jJELa8c");
