import { wrapFetchWithPayment } from "@x402/fetch";
import { x402Client } from "@x402/core/client";
import { ExactSvmScheme } from "@x402/svm/exact/client";
import { createKeyPairSignerFromBytes } from "@solana/kit";
import { base58 } from "@scure/base";

let cachedPaidFetch: typeof fetch | null = null;

async function getPaidFetch() {
  if (cachedPaidFetch) return cachedPaidFetch;

  const secretKeyBase58 = process.env.X402_PROJECT_WALLET_SECRET_KEY;
  if (!secretKeyBase58) {
    throw new Error("Missing X402_PROJECT_WALLET_SECRET_KEY env var");
  }

  const svmSigner = await createKeyPairSignerFromBytes(
    base58.decode(secretKeyBase58),
  );

  const client = new x402Client();
  client.register("solana:*", new ExactSvmScheme(svmSigner));

  cachedPaidFetch = wrapFetchWithPayment(fetch, client);
  return cachedPaidFetch;
}

export async function callX402Api<T = unknown>(
  path: string,
  body: unknown,
): Promise<T> {
  const paidFetch = await getPaidFetch();
  const res = await paidFetch(`https://x402engine.app${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`x402 call failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<T>;
}
