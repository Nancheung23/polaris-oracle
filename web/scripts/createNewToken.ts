import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import bs58 from "bs58";

const TOKEN_DECIMALS = 6;
const TOTAL_SUPPLY_HUMAN = 1_000_000_000;

async function main() {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
  );

  const payerSecret = process.env.ADMIN_WALLET_SECRET_KEY;
  if (!payerSecret) throw new Error("Missing ADMIN_WALLET_SECRET_KEY");
  const payer = Keypair.fromSecretKey(bs58.decode(payerSecret));

  const mintKeypair = Keypair.generate();
  console.log("New mint address:", mintKeypair.publicKey.toBase58());
  console.log("mint private key");
  console.log("Mint secret (base58):", bs58.encode(mintKeypair.secretKey));

  const lamports = await getMinimumBalanceForRentExemptMint(connection);
  const ata = getAssociatedTokenAddressSync(
    mintKeypair.publicKey,
    payer.publicKey,
  );

  const tx = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mintKeypair.publicKey,
      TOKEN_DECIMALS,
      payer.publicKey,
      payer.publicKey,
      TOKEN_PROGRAM_ID,
    ),
    createAssociatedTokenAccountInstruction(
      payer.publicKey,
      ata,
      payer.publicKey,
      mintKeypair.publicKey,
    ),
    createMintToInstruction(
      mintKeypair.publicKey,
      ata,
      payer.publicKey,
      BigInt(TOTAL_SUPPLY_HUMAN) * BigInt(10 ** TOKEN_DECIMALS),
    ),
  );

  const sig = await sendAndConfirmTransaction(connection, tx, [
    payer,
    mintKeypair,
  ]);
  console.log("Done. Tx:", sig);
  console.log(
    "Mint address to use everywhere:",
    mintKeypair.publicKey.toBase58(),
  );
}

main().catch(console.error);
