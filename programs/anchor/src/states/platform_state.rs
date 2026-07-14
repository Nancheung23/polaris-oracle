use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct PlatformState {
    // admin
    pub authority: Pubkey,
    // token mint
    pub mint: Pubkey,
    // team vault
    pub vault: Pubkey,
    // current price(token amount) for service
    pub price: u64,
    // burn rate set defaultly per order (%)
    pub rate: u8,
    // statistics: total consume
    pub total_consume: u64,
    // statistics: total service
    pub total_service: u64,
    // statistics: total burnt
    pub total_burnt: u64,
    // bump
    pub bump: u8,
}

impl PlatformState {
    // calculate signle service
    pub fn calculate_service(&self) -> (u64, u64) {
        // current burn amount per service
        let amount_burn = self
            .price
            .checked_mul(self.rate as u64)
            .unwrap_or(0)
            .checked_div(100)
            .unwrap_or(0);
        // rest amount going to vault
        let amount_vault = self.price.checked_sub(amount_burn as u64).unwrap_or(0);
        // return tuple
        (amount_burn, amount_vault)
    }

    // record new order
    pub fn new_order(&mut self, amount_burnt: u64) {
        self.total_service = self
            .total_service
            .checked_add(1)
            .unwrap_or(self.total_service);
        self.total_consume = self
            .total_consume
            .checked_add(self.price)
            .unwrap_or(self.total_consume);
        self.total_burnt = self
            .total_burnt
            .checked_add(amount_burnt)
            .unwrap_or(self.total_burnt);
    }
}
