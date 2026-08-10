"use client";

import { useState, useCallback } from "react";
import { useConnection, useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { getProgram } from "@/lib/program";

export function useConsumeTicket() {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const { publicKey } = useWallet();

  const [consuming, setConsuming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const consumeTicket = useCallback(async () => {
    if (!publicKey || !anchorWallet) {
      setError("Wallet not connected");
      return null;
    }
    setConsuming(true);
    setError(null);
    try {
      const provider = new AnchorProvider(connection, anchorWallet, {});
      const program = getProgram(provider);

      const txSignature = await program.methods
        .consumeTicket()
        .accounts({})
        .rpc();

      return { txSignature };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to consume ticket";
      setError(message);
      return null;
    } finally {
      setConsuming(false);
    }
  }, [publicKey, anchorWallet, connection]);

  return { consumeTicket, consuming, error };
}