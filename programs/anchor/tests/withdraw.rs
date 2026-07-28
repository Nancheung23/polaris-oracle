mod common;
use std::assert_eq;

use anchor::error::PolarisError;
use anchor_lang::{
    solana_program::{self, msg},
    AccountDeserialize,
};
use anchor_litesvm::{TestHelpers, TransactionHelpers, TransactionResult};
use anchor_spl::{
    associated_token::get_associated_token_address, token::spl_token, token_interface::TokenAccount,
};
use common::*;
use solana_signer::Signer;
use spl_associated_token_account::ID as ASSOCIATED_TOKEN_PROGRAM_ID;
use spl_token::ID as TOKEN_PROGRAM_ID;

#[test]
fn test_withdraw_success() {
    let mut test_context = setup();
    // pdas
    let platform_pda = platform_pda(&test_context.admin.pubkey());
    // authority / mint
    let vault = get_associated_token_address(&platform_pda, &test_context.mint.pubkey());
    let authority_ata = test_context
        .svm
        .svm
        .create_associated_token_account(&test_context.mint.pubkey(), &test_context.admin)
        .unwrap();
    // ix for initialize
    let ix = test_context
        .svm
        .program()
        .accounts(anchor::accounts::Initialize {
            authority: test_context.admin.pubkey(),
            mint: test_context.mint.pubkey(),
            platform_pda,
            vault,
            system_program: solana_program::system_program::ID,
            token_program: TOKEN_PROGRAM_ID,
            associated_token_program: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .args(anchor::instruction::Initialize {
            price: 100,
            rate: 10,
            airdrop_requirement: 100,
            airdrop_budget: 1000,
            new_operator: None,
        })
        .instruction()
        .unwrap();

    // send ix
    let result = test_context
        .svm
        .svm
        .send_instruction(ix, &[&test_context.admin]);
    // assert
    assert!(result.is_ok());

    // mint tokens to vault
    test_context
        .svm
        .svm
        .mint_to(
            &test_context.mint.pubkey(),
            &vault,
            &test_context.admin,
            10_000,
        )
        .unwrap();

    // get vault token amount
    let vault_account_before = test_context.svm.svm.get_account(&vault).unwrap();
    let vault_token_before: TokenAccount =
        TokenAccount::try_deserialize(&mut vault_account_before.data.as_slice()).unwrap();
    let total_amount = vault_token_before.amount;

    // ix for withdraw
    let ix = test_context
        .svm
        .program()
        .accounts(anchor::accounts::Withdraw {
            authority: test_context.admin.pubkey(),
            mint: test_context.mint.pubkey(),
            platform_pda,
            vault,
            authority_ata,
            system_program: solana_program::system_program::ID,
            token_program: TOKEN_PROGRAM_ID,
            associated_token_program: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .args(anchor::instruction::Withdraw { amount: 100 })
        .instruction()
        .unwrap();
    let result = test_context
        .svm
        .svm
        .send_instruction(ix, &[&test_context.admin]);
    assert!(result.is_ok());
    let vault_account_after = test_context.svm.svm.get_account(&vault).unwrap();
    let vault_token_after: TokenAccount =
        TokenAccount::try_deserialize(&mut vault_account_after.data.as_slice()).unwrap();

    assert_eq!(vault_token_after.amount, total_amount - 100);
    assert_eq!(vault_token_after.amount, 9_900);
}

#[test]
fn test_withdraw_failed() {
    let mut test_context = setup();
    // pdas
    let platform_pda = platform_pda(&test_context.admin.pubkey());
    // authority / mint
    let vault = get_associated_token_address(&platform_pda, &test_context.mint.pubkey());
    let authority_ata = test_context
        .svm
        .svm
        .create_associated_token_account(&test_context.mint.pubkey(), &test_context.admin)
        .unwrap();
    // ix for initialize
    let ix = test_context
        .svm
        .program()
        .accounts(anchor::accounts::Initialize {
            authority: test_context.admin.pubkey(),
            mint: test_context.mint.pubkey(),
            platform_pda,
            vault,
            system_program: solana_program::system_program::ID,
            token_program: TOKEN_PROGRAM_ID,
            associated_token_program: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .args(anchor::instruction::Initialize {
            price: 100,
            rate: 10,
            airdrop_requirement: 100,
            airdrop_budget: 1000,
            new_operator: None,
        })
        .instruction()
        .unwrap();

    // send ix
    let result = test_context
        .svm
        .svm
        .send_instruction(ix, &[&test_context.admin]);
    // assert
    assert!(result.is_ok());

    // get vault token amount
    let vault_account_before = test_context.svm.svm.get_account(&vault).unwrap();
    let vault_token_before: TokenAccount =
        TokenAccount::try_deserialize(&mut vault_account_before.data.as_slice()).unwrap();
    let total_amount = vault_token_before.amount;

    // ix for withdraw
    let ix = test_context
        .svm
        .program()
        .accounts(anchor::accounts::Withdraw {
            authority: test_context.admin.pubkey(),
            mint: test_context.mint.pubkey(),
            platform_pda,
            vault,
            authority_ata,
            system_program: solana_program::system_program::ID,
            token_program: TOKEN_PROGRAM_ID,
            associated_token_program: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .args(anchor::instruction::Withdraw { amount: 100 })
        .instruction()
        .unwrap();
    let result = test_context
        .svm
        .svm
        .send_instruction(ix, &[&test_context.admin]);
    // assert!(result.is_err());
    assert!(
        !TransactionResult::error(result.as_ref().unwrap()).is_none(),
        "this result should be failed"
    );
    // assert error code (3012: no user ata, 6001: custom)
    let expected_code =
        PolarisError::InsufficientVaultBalance as u32 + anchor_lang::error::ERROR_CODE_OFFSET;
    let error_str = TransactionResult::error(result.as_ref().unwrap()).unwrap();
    msg!("{}", error_str);
    let actual_code: u32 = error_str
        .split("Custom(")
        .nth(1)
        .and_then(|s| s.split(')').next())
        .and_then(|s| s.parse().ok())
        .expect("wrong code");
    assert_eq!(expected_code, actual_code);

    let vault_account_after = test_context.svm.svm.get_account(&vault).unwrap();
    let vault_token_after: TokenAccount =
        TokenAccount::try_deserialize(&mut vault_account_after.data.as_slice()).unwrap();

    assert_eq!(vault_token_after.amount, total_amount);
    assert_eq!(vault_token_after.amount, 0);
}
