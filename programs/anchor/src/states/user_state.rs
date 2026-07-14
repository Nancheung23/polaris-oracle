use anchor_lang::prelude::*;

use crate::error::PolarisError;

#[account]
#[derive(InitSpace)]
pub struct UserState {
    // user's wallet address
    pub owner: Pubkey,
    // available credits
    pub tickets: u64,
    // personal statistics: consume
    pub total_consume: u64,
    // personal statistics: service
    pub total_service: u64,
    // order id
    pub last_order_id: u64,
    // last use time
    pub timestamp: i64,
    // bump
    pub bump: u8,
}
impl UserState {
    // for everytime use service, generate onchain order id, and update ticket amount
    pub fn use_and_generate_id(&mut self) -> Result<u64> {
        require!(self.tickets > 0, PolarisError::InsuffientTicket);
        // update ticket and order id
        self.tickets = self.tickets.checked_sub(1).unwrap();
        self.last_order_id = self.last_order_id.checked_add(1).unwrap();
        // update timestamp and total service
        self.total_service = self.total_service.checked_add(1).unwrap();
        self.timestamp = Clock::get()?.unix_timestamp;
        Ok(self.last_order_id)
    }
}
