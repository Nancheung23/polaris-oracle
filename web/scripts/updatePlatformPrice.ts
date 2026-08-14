import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { AnchorProvider, Wallet, BN } from "@coral-xyz/anchor";
import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { getProgram } from "@/lib/program";
import { ADMIN, DEVNET_MINT_ADDRESS } from "@/lib/constants";

const TOKEN_DECIMALS = 6;

const NEW_PRICE_HUMAN_READABLE = 10;

async function main() {
  const adminSecretKeyBase58 = process.env.ADMIN_WALLET_SECRET_KEY;
  if (!adminSecretKeyBase58) {
    throw new Error("Missing ADMIN_WALLET_SECRET_KEY in .env.local");
  }

  const adminKeypair = Keypair.fromSecretKey(bs58.decode(adminSecretKeyBase58));
  if (!adminKeypair.publicKey.equals(ADMIN)) {
    throw new Error(
      `Loaded keypair (${adminKeypair.publicKey.toBase58()}) does not match ADMIN constant (${ADMIN.toBase58()})`,
    );
  }

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
  );
  const wallet = new Wallet(adminKeypair);
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  const program = getProgram(provider);

  const newPriceRaw = new BN(NEW_PRICE_HUMAN_READABLE * 10 ** TOKEN_DECIMALS);

  console.log(
    `Updating price to ${NEW_PRICE_HUMAN_READABLE} tokens (${newPriceRaw.toString()} raw units)...`,
  );

  const txSignature = await program.methods
    .updatePlatformState(newPriceRaw, null, null)
    .accounts({
      mint: DEVNET_MINT_ADDRESS,
    })
    .rpc();

  console.log("Done. Tx:", txSignature);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
