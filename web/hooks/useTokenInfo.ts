"use client";

import { useState, useEffect } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { getMint } from "@solana/spl-token";
import { DEVNET_MINT_ADDRESS } from "@/lib/constants";

const TOKEN_DECIMALS = 6;

export function useTokenInfo() {
  const { connection } = useConnection();
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMint() {
      try {
        const mintInfo = await getMint(connection, DEVNET_MINT_ADDRESS);
        if (!cancelled) {
          setTotalSupply(Number(mintInfo.supply) / 10 ** TOKEN_DECIMALS);
        }
      } catch (e: unknown) {
        console.error("useTokenInfo failed:", e);
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Failed to fetch token info",
          );
          setTotalSupply(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMint();

    return () => {
      cancelled = true;
    };
  }, [connection]);

  return {
    totalSupply,
    loading,
    error,
    mintAddress: DEVNET_MINT_ADDRESS.toBase58(),
  };
}
