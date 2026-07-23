use anchor_lang::prelude::*;

#[constant]
pub const SEED: &str = "anchor";
pub const DISCRIMNATOR: usize = 8;
pub const PLATFORM: &[u8; 8] = b"platform";
pub const USER: &[u8; 4] = b"user";

/// Only this address is allowed to initialize a `PlatformState`.
pub const ADMIN: Pubkey = pubkey!("HNZsqu8wnc1kmRBxeFAT91ka9KBtvZ7vkELN5jJELa8c");
// Operator address is allowed (static mode)
pub const OPERATOR: Pubkey = pubkey!("5w9rqasdEK5JEy6TDxHvUArBpKoiLVEiMRSWQh7vEu6b");
