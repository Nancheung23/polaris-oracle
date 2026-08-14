"use client";

import { useState, useEffect, useCallback } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { getProgram } from "@/lib/program";
import { PROGRAM_ID, ADMIN } from "@/lib/constants";

export interface PlatformStats {
  totalConsume: number;
  totalService: number;
  totalBurnt: number;
  price: number;
  rate: number;
  paused: boolean;
}

export function usePlatformStats() {
  const { connection } = useConnection();

  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const readonlyProvider = new AnchorProvider(
        connection,
        {
          publicKey: PublicKey.default,
          signTransaction: async () => {
            throw new Error("Read-only provider cannot sign transactions");
          },
          signAllTransactions: async () => {
            throw new Error("Read-only provider cannot sign transactions");
          },
        },
        { commitment: "confirmed" },
      );
      const program = getProgram(readonlyProvider);

      const [platformPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("platform"), ADMIN.toBuffer()],
        PROGRAM_ID,
      );

      const accountInfo = await connection.getAccountInfo(platformPda);
      if (!accountInfo) {
        throw new Error("PlatformState account not found");
      }
      const decoded = program.coder.accounts.decode(
        "platformState",
        accountInfo.data,
      );

      setStats({
        totalConsume: decoded.totalConsume.toNumber(),
        totalService: decoded.totalService.toNumber(),
        totalBurnt: decoded.totalBurnt.toNumber(),
        price: decoded.price.toNumber(),
        rate: Number(decoded.rate),
        paused: decoded.paused,
      });
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Failed to fetch platform stats";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [connection]);

  useEffect(() => {
    queueMicrotask(() => fetchStats());
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
