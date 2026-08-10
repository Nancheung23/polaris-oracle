import { Connection } from "@solana/web3.js";

async function main() {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
  );
  const tx = await connection.getParsedTransaction(
    "4urk6ZEwp1smEhHDqcu9hN56oTxqf2iLsAdTvgmwgb58cYPX6ybzLj8rErsv4K7HWVyJpZAp1uW8G1krgwRhLKY6",
    {
      maxSupportedTransactionVersion: 0,
    },
  );
  console.log(JSON.stringify(tx?.transaction.message.instructions, null, 2));
}

main();
