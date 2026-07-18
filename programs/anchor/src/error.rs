use anchor_lang::prelude::*;

#[error_code]
pub enum PolarisError {
    #[msg("Unauthorized Admin")]
    UnauthorizedAdmin,
    #[msg("Insufficient Ticket")]
    InsuffientTicket,
    #[msg("Insufficient Vault Balance")]
    InsuffientVaultBalance,
    #[msg("Invalid Rate")]
    InvalidRate,
    #[msg("Unauthorized Operator")]
    UnauthorizedOperator,
    #[msg("Platform paused")]
    PlatformPaused,
}
