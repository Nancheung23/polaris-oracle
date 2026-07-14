use anchor_lang::prelude::*;

#[error_code]
pub enum PolarisError {
    #[msg("Insufficient Ticket")]
    InsuffientTicket,
}
