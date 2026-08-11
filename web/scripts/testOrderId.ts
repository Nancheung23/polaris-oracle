import { getLatestOrderId } from "../lib/solana/getLastestOrderId";

async function main() {
  const walletAddress = "J98NRis7Jx3nrRBJzbzMupXsZbq2MkytDboRbuYvcsyD";

  try {
    const orderId = await getLatestOrderId(walletAddress);
    console.log("Latest orderId:", orderId);
  } catch (error) {
    console.error("Searcn error:", error);
  }
}

main();
