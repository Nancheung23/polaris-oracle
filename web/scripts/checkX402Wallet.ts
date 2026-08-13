import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createKeyPairSignerFromBytes } from "@solana/kit";
import { base58 } from "@scure/base";
import { Connection, PublicKey } from "@solana/web3.js";

// USDC mint on Solana mainnet
const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

async function main() {
  const secretKeyBase58 = process.env.X402_PROJECT_WALLET_SECRET_KEY;
  if (!secretKeyBase58) {
    throw new Error("Missing X402_PROJECT_WALLET_SECRET_KEY in .env.local");
  }

  const signer = await createKeyPairSignerFromBytes(
    base58.decode(secretKeyBase58),
  );

  console.log("Wallet address:", signer.address);

  const expectedAddress = process.env.X402_PROJECT_WALLET_ADDRESS;
  if (expectedAddress && expectedAddress !== signer.address) {
    console.warn(
      `⚠️ Mismatch: .env.local X402_PROJECT_WALLET_ADDRESS (${expectedAddress}) does not match the address derived from the secret key (${signer.address})`,
    );
  } else {
    console.log("✅ Address matches X402_PROJECT_WALLET_ADDRESS");
  }

  // 用公共主网RPC查余额(只读，不花钱)
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const publicKey = new PublicKey(signer.address);

  const solBalance = await connection.getBalance(publicKey);
  console.log(`SOL balance: ${solBalance / 1e9} SOL`);

  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    publicKey,
    {
      mint: USDC_MINT,
    },
  );

  if (tokenAccounts.value.length === 0) {
    console.log(
      "USDC balance: 0 (no USDC token account found — you likely haven't received any USDC yet)",
    );
  } else {
    const usdcAmount =
      tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
    console.log(`USDC balance: ${usdcAmount} USDC`);
  }

  if (solBalance / 1e9 < 0.005) {
    console.warn("⚠️ SOL balance looks low for paying transaction fees");
  }
}

main().catch((err) => {
  console.error("Check failed:", err);
  process.exit(1);
});
