use anchor_lang::prelude::*;

#[error_code]
pub enum PolarisError {
    #[msg("Unauthorized Admin")]
    UnauthorizedAdmin,
    #[msg("Insufficient Ticket")]
    InsuffientTicket,
    #[msg("Invalid Rate")]
    InvalidRate,
    #[msg("Platform paused")]
    PlatformPaused,
}
