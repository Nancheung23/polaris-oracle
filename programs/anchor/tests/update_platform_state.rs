mod common;
use anchor::error::PolarisError;
use anchor_lang::{prelude::msg, solana_program, AccountDeserialize};
use anchor_litesvm::{TransactionHelpers, TransactionResult};
use anchor_spl::{associated_token::get_associated_token_address, token::spl_token};
use common::*;
use solana_signer::Signer;
use spl_associated_token_account::ID as ASSOCIATED_TOKEN_PROGRAM_ID;
use spl_token::ID as TOKEN_PROGRAM_ID;

#[test]
fn test_update_platform_state_success() {
    let mut test_context = setup();
    // pdas
    let platform_pda = platform_pda(&test_context.admin.pubkey());
    // authority / mint
    let vault = get_associated_token_address(&platform_pda, &test_context.mint.pubkey());
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

    // ix for update platform state
    let ix = test_context
        .svm
        .program()
        .accounts(anchor::accounts::UpdatePlatformState {
            authority: test_context.admin.pubkey(),
            platform_pda,
        })
        .args(anchor::instruction::UpdatePlatformState {
            price: Some(50),
            rate: Some(20),
        })
        .instruction()
        .unwrap();
    let result = test_context
        .svm
        .svm
        .send_instruction(ix, &[&test_context.admin]);
    let tx_result = result.unwrap();
    assert!(
        TransactionResult::error(&tx_result).is_none(),
        "tx failed: {:?}",
        TransactionResult::error(&tx_result)
    );

    // deserialize pda
    let account_data = test_context.svm.svm.get_account(&platform_pda).unwrap();
    let platform_state: anchor::PlatformState =
        anchor::PlatformState::try_deserialize(&mut account_data.data.as_slice()).unwrap();
    assert_eq!(platform_state.price, 50);
    assert_eq!(platform_state.rate, 20);
}

#[test]
fn test_update_platform_state_failed() {
    let mut test_context = setup();
    // pdas
    let platform_pda = platform_pda(&test_context.admin.pubkey());
    // authority / mint
    let vault = get_associated_token_address(&platform_pda, &test_context.mint.pubkey());
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

    // ix for update platform state
    let ix = test_context
        .svm
        .program()
        .accounts(anchor::accounts::UpdatePlatformState {
            authority: test_context.admin.pubkey(),
            platform_pda,
        })
        .args(anchor::instruction::UpdatePlatformState {
            price: None,
            // invalid rate
            rate: Some(120),
        })
        .instruction()
        .unwrap();
    let result = test_context
        .svm
        .svm
        .send_instruction(ix, &[&test_context.admin]);
    let tx_result = result.unwrap();
    assert!(
        TransactionResult::error(&tx_result).is_some(),
        "expected InvalidRate"
    );
    // assert error code
    let expected_code = PolarisError::InvalidRate as u32 + anchor_lang::error::ERROR_CODE_OFFSET;
    let error_str = TransactionResult::error(&tx_result).unwrap();
    msg!("{}", error_str);
    let actual_code: u32 = error_str
        .split("Custom(")
        .nth(1)
        .and_then(|s| s.split(')').next())
        .and_then(|s| s.parse().ok())
        .expect("wrong code");
    assert_eq!(expected_code, actual_code);
}
