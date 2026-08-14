const anchor = require("@coral-xyz/anchor");
const { Connection, Keypair, PublicKey } = require("@solana/web3.js");
const fs = require("fs");

async function main() {
  const secretKey = JSON.parse(
    fs.readFileSync("/home/yannan/.config/solana/id.json", "utf-8"),
  );
  const adminKeypair = Keypair.fromSecretKey(new Uint8Array(secretKey));

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
  );
  const wallet = new anchor.Wallet(adminKeypair);
  const provider = new anchor.AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  anchor.setProvider(provider);

  const idl = JSON.parse(fs.readFileSync("./target/idl/anchor.json", "utf-8"));
  const program = new anchor.Program(idl, provider);

  const mint = new PublicKey("CU8bWG3wCK2FX8w7qc4P7FF2CKaTxt3Q3xR3HfCDDMeS");

  const [platformPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("platform"), adminKeypair.publicKey.toBuffer()],
    program.programId,
  );

  const vault = anchor.utils.token.associatedAddress({
    mint: mint,
    owner: platformPda,
  });

  console.log("Platform PDA:", platformPda.toBase58());
  console.log("Vault:", vault.toBase58());

  const TOKEN_DECIMALS = 6;
  const price = 100 * 10 ** TOKEN_DECIMALS;

  const txHash = await program.methods
    .initialize(
      new anchor.BN(price),
      10,
      new anchor.BN(100_000 * 10 ** TOKEN_DECIMALS),
      new anchor.BN(50_000_000 * 10 ** TOKEN_DECIMALS),
      null,
    )
    .accounts({
      authority: adminKeypair.publicKey,
      mint: new PublicKey("CU8bWG3wCK2FX8w7qc4P7FF2CKaTxt3Q3xR3HfCDDMeS"),
      platformPda: platformPda,
      vault: vault,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
    })
    .signers([adminKeypair])
    .rpc();

  console.log("Initialize done, tx:", txHash);
}

main().catch(console.error);
