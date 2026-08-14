import anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import fs from "fs";

const MINT_ADDRESS = "CU8bWG3wCK2FX8w7qc4P7FF2CKaTxt3Q3xR3HfCDDMeS";
const TOKEN_DECIMALS = 6;

async function main() {
  const recipientAddress = process.argv[2];
  const amountHuman = process.argv[3] ? Number(process.argv[3]) : 1000;

  if (!recipientAddress) {
    console.error(
      "Usage: npx tsx faucet.ts <recipient_wallet_address> [amount]",
    );
    process.exit(1);
  }

  const secretKey = JSON.parse(
    fs.readFileSync("/home/yannan/.config/solana/id.json", "utf-8"),
  );
  const authority = Keypair.fromSecretKey(new Uint8Array(secretKey));

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
  );
  const mint = new PublicKey(MINT_ADDRESS);
  const recipient = new PublicKey(recipientAddress);

  console.log(`Minting ${amountHuman} tokens to ${recipientAddress}...`);

  const recipientAta = await getOrCreateAssociatedTokenAccount(
    connection,
    authority,
    mint,
    recipient,
  );

  const rawAmount = BigInt(amountHuman) * BigInt(10 ** TOKEN_DECIMALS);

  const sig = await mintTo(
    connection,
    authority,
    mint,
    recipientAta.address,
    authority,
    rawAmount,
  );

  console.log("Done. Tx:", sig);
  console.log("Recipient ATA:", recipientAta.address.toBase58());
}

main().catch(console.error);
