use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{self, Mint, TokenAccount, TokenInterface},
};

use crate::{error::PolarisError, PlatformState, UserState, ADMIN, PLATFORM, USER};

#[derive(Accounts)]
pub struct Airdrop<'info> {
    // operator
    #[account(
        mut,
        constraint = operator.key() == platform_pda.operator @ PolarisError::UnauthorizedOperator,
    )]
    pub operator: Signer<'info>,

    #[account(
        address = ADMIN @ PolarisError::UnauthorizedAdmin,
    )]
    // team address
    pub authority: SystemAccount<'info>,
    // airdrop receiver
    #[account(mut)]
    pub user: SystemAccount<'info>,
    // mint token
    pub mint: InterfaceAccount<'info, Mint>,
    // platform pda
    #[account(
        seeds = [PLATFORM, authority.key().as_ref()],
        bump
    )]
    pub platform_pda: Account<'info, PlatformState>,
    // user pda
    #[account(
            mut,
            seeds = [USER, authority.key().as_ref(), user.key().as_ref()],
            bump
        )
    ]
    pub user_pda: Account<'info, UserState>,
    // vault ata
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = platform_pda,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,
    // user ata
    #[account(
        init_if_needed,
        payer = operator,
        associated_token::mint = mint,
        associated_token::authority = user,
    )]
    pub user_ata: InterfaceAccount<'info, TokenAccount>,
    // program
    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

pub fn handler(ctx: Context<Airdrop>, airdrop_amount: u64) -> Result<()> {
    // check valid airdrop amount
    let budget = ctx.accounts.platform_pda.airdrop_budget;
    require!(
        airdrop_amount <= ctx.accounts.vault.amount,
        PolarisError::InsufficientVaultBalance
    );
    require!(
        airdrop_amount <= budget,
        PolarisError::InsufficientAirdropBudget
    );
    let total_service = ctx.accounts.user_pda.total_service;
    // check recerived airdrop times
    let requirement = ctx.accounts.platform_pda.airdrop_requirement;
    let airdrop_times = ctx.accounts.user_pda.airdrop_times;
    let remain_total_services = total_service
        .checked_sub(
            airdrop_times
                .checked_mul(ctx.accounts.platform_pda.airdrop_requirement)
                .ok_or(PolarisError::MathOverflow)?,
        )
        .ok_or(PolarisError::MathOverflow)?;
    // check valid total service
    require!(
        total_service >= requirement && remain_total_services >= requirement,
        PolarisError::NotEligibleUser
    );
    // cpi accounts
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_accounts = token_interface::TransferChecked {
        from: ctx.accounts.vault.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.user_ata.to_account_info(),
        authority: ctx.accounts.platform_pda.to_account_info(),
    };
    // seeds
    let authority = &ctx.accounts.authority;
    let cpi_bumps = &[ctx.bumps.platform_pda];
    let cpi_seeds = &[PLATFORM, authority.key.as_ref(), cpi_bumps];
    let signer_seeds = &[&cpi_seeds[..]];
    // cpi ctx
    let cpi_ctx = CpiContext::new_with_signer(cpi_program.key(), cpi_accounts, signer_seeds);
    // transfer airdrop
    token_interface::transfer_checked(cpi_ctx, airdrop_amount, ctx.accounts.mint.decimals)?;
    // if succeed, airdrop times ++
    UserState::new_airdrop(&mut ctx.accounts.user_pda);
    // update budget
    let new_budget = budget
        .checked_sub(airdrop_amount)
        .ok_or(PolarisError::InsufficientAirdropBudget)?;
    // update new budget
    PlatformState::update_airdrop_budget(&mut ctx.accounts.platform_pda, new_budget);
    Ok(())
}
