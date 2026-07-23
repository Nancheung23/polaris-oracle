use anchor_lang::prelude::*;

#[error_code]
pub enum PolarisError {
    #[msg("Unauthorized Admin")]
    UnauthorizedAdmin,
    #[msg("Insufficient Ticket")]
    InsufficientTicket,
    #[msg("Insufficient Vault Balance")]
    InsufficientVaultBalance,
    #[msg("Insufficient Airdrop Budget")]
    InsufficientAirdropBudget,
    #[msg("Invalid Rate")]
    InvalidRate,
    #[msg("Unauthorized Operator")]
    UnauthorizedOperator,
    #[msg("Invalid New Operator")]
    InvalidNewOperator,
    #[msg("Platform paused")]
    PlatformPaused,
    #[msg("Invalid Requirement")]
    InvalidRequirement,
    #[msg("Not eligible user")]
    NotEligibleUser,
    #[msg("Math overflow")]
    MathOverflow,
}
