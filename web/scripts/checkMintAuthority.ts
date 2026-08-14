import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Connection } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import { DEVNET_MINT_ADDRESS } from "@/lib/constants";

async function main() {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
  );
  const mintInfo = await getMint(connection, DEVNET_MINT_ADDRESS);
  console.log(
    "Mint authority:",
    mintInfo.mintAuthority?.toBase58() ?? "none (revoked)",
  );
}

main();
