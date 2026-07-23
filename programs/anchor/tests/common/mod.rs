use anchor::{PLATFORM, USER};
use anchor_litesvm::{AnchorContext, AnchorLiteSVM, TestHelpers};
use solana_keypair::{read_keypair_file, Keypair};
use solana_pubkey::Pubkey;
use solana_signer::Signer;

pub struct TestContext {
    pub svm: AnchorContext,
    pub admin: Keypair,
    pub operator: Keypair,
    pub user: Keypair,
    pub mint: Keypair,
}

pub fn setup() -> TestContext {
    // define LAMPORTS
    const LAMPORTS: u64 = 10_000_000_000;
    // build svm
    let mut svm = AnchorLiteSVM::build_with_program(
        anchor::ID,
        include_bytes!("../../../../target/deploy/anchor.so"),
    );
    // read keypairs
    let admin =
        read_keypair_file("tests/fixtures/admin-keypair.json").expect("Missing admin keypair");
    let operator = read_keypair_file("tests/fixtures/operator-keypair.json")
        .expect("Missing operator keypair");
    // generate test user
    let user = Keypair::new();
    // airdrop sol for rent and transfee
    svm.svm.airdrop(&admin.pubkey(), LAMPORTS).unwrap();
    svm.svm.airdrop(&operator.pubkey(), LAMPORTS).unwrap();
    svm.svm.airdrop(&user.pubkey(), LAMPORTS).unwrap();
    // create mint
    let mint = create_test_mint(&mut svm, &admin);
    // return context
    TestContext {
        svm,
        admin,
        operator,
        user,
        mint,
    }
}

// for creating mint
fn create_test_mint(svm: &mut AnchorContext, authority: &Keypair) -> Keypair {
    svm.svm.create_token_mint(authority, 6).unwrap()
}

// calculate pda address
// platform pda
pub fn platform_pda(admin: &Pubkey) -> Pubkey {
    Pubkey::find_program_address(&[PLATFORM, admin.as_ref()], &anchor::ID).0
}
// user pda
pub fn user_pda(admin: &Pubkey, user: &Pubkey) -> Pubkey {
    Pubkey::find_program_address(&[USER, admin.as_ref(), user.as_ref()], &anchor::ID).0
}
