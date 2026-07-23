mod common;
use anchor_lang::{solana_program, AccountDeserialize};
use anchor_litesvm::TransactionHelpers;
use anchor_spl::{associated_token::get_associated_token_address, token::spl_token};
use common::*;
use solana_signer::Signer;
use spl_associated_token_account::ID as ASSOCIATED_TOKEN_PROGRAM_ID;
use spl_token::ID as TOKEN_PROGRAM_ID;

#[test]
fn test_initialize_success() {
    // get context from mod.rs
    let mut test_context = setup();
    // check mod.rs
    let platform_pda = platform_pda(&test_context.admin.pubkey());
    // authority / mint
    let vault = get_associated_token_address(&platform_pda, &test_context.mint.pubkey());
    // ix (Context + args)
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

    // deserialize pda
    let account_data = test_context.svm.svm.get_account(&platform_pda).unwrap();
    let platform_state: anchor::PlatformState =
        anchor::PlatformState::try_deserialize(&mut account_data.data.as_slice()).unwrap();
    // assert attributes
    assert_eq!(platform_state.price, 100);
    assert_eq!(platform_state.rate, 10);
    assert_eq!(platform_state.airdrop_requirement, 100);
    assert_eq!(platform_state.airdrop_budget, 1000);
    assert_eq!(platform_state.paused, false);
    assert_eq!(platform_state.authority, test_context.admin.pubkey());
    assert_eq!(platform_state.mint, test_context.mint.pubkey());
}
