mod common;
use std::assert_eq;

use anchor_lang::{solana_program, AccountDeserialize};
use anchor_litesvm::{TestHelpers, TransactionHelpers};
use anchor_spl::{associated_token::get_associated_token_address, token::spl_token};
use common::*;
use solana_signer::Signer;
use spl_associated_token_account::ID as ASSOCIATED_TOKEN_PROGRAM_ID;
use spl_token::ID as TOKEN_PROGRAM_ID;

#[test]
fn test_buy_ticket_success() {
    let mut test_context = setup();
    // pdas
    let platform_pda = platform_pda(&test_context.admin.pubkey());
    let user_pda = user_pda(&test_context.admin.pubkey(), &test_context.user.pubkey());
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
    // create user ata
    let user_ata = test_context
        .svm
        .svm
        .create_associated_token_account(&test_context.mint.pubkey(), &test_context.user)
        .unwrap();
    test_context
        .svm
        .svm
        .mint_to(
            &test_context.mint.pubkey(),
            &user_ata,
            &test_context.admin,
            10_000,
        )
        .unwrap();
    // ix for buy ticket
    let ix = test_context
        .svm
        .program()
        .accounts(anchor::accounts::BuyTicket {
            user: test_context.user.pubkey(),
            authority: test_context.admin.pubkey(),
            mint: test_context.mint.pubkey(),
            platform_pda,
            user_pda,
            vault,
            user_ata,
            system_program: solana_program::system_program::ID,
            token_program: TOKEN_PROGRAM_ID,
            associated_token_program: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .args(anchor::instruction::BuyTicket {})
        .instruction()
        .unwrap();

    // send ix
    let result = test_context
        .svm
        .svm
        .send_instruction(ix, &[&test_context.user]);
    // assert
    assert!(result.is_ok());
    // deserialize pda
    let account_data_platform = test_context.svm.svm.get_account(&platform_pda).unwrap();
    let account_data_user = test_context.svm.svm.get_account(&user_pda).unwrap();
    let platform_state: anchor::PlatformState =
        anchor::PlatformState::try_deserialize(&mut account_data_platform.data.as_slice()).unwrap();
    let user_state: anchor::UserState =
        anchor::UserState::try_deserialize(&mut account_data_user.data.as_slice()).unwrap();
    // assert attributes: user
    assert_eq!(user_state.tickets, 1);
    assert_eq!(user_state.total_consume, 100);
    // assert attributes: platform
    assert_eq!(platform_state.total_service, 0);
    assert_eq!(platform_state.total_consume, 100);
    assert_eq!(platform_state.total_burnt, 10);
}
