"use client";

import { useState, useEffect, useCallback } from "react";
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getProgram } from "@/lib/program";
import { PROGRAM_ID, ADMIN, DEVNET_MINT_ADDRESS } from "@/lib/constants";

export function useUserTicket() {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const { publicKey } = useWallet();

  const [tickets, setTickets] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalConsume, setTotalConsume] = useState<number | null>(null);
  const [totalService, setTotalService] = useState<number | null>(null);

  const fetchTickets = useCallback(async () => {
    if (!publicKey || !anchorWallet) {
      setTickets(null);
      setTotalConsume(null);
      setTotalService(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const provider = new AnchorProvider(connection, anchorWallet, {});
      const program = getProgram(provider);

      const [userPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), ADMIN.toBuffer(), publicKey.toBuffer()],
        PROGRAM_ID,
      );

      const account = await program.account.userState.fetch(userPda);
      setTickets(Number(account.tickets));
      setTotalConsume(Number(account.totalConsume));
      setTotalService(Number(account.totalService));
    } catch {
      setTickets(0);
      setTotalConsume(0);
      setTotalService(0);
    } finally {
      setLoading(false);
    }
  }, [publicKey, anchorWallet, connection]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await fetchTickets();
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchTickets]);

  const buyTicket = useCallback(async () => {
    if (!publicKey || !anchorWallet) return;
    setBuying(true);
    setError(null);
    try {
      const provider = new AnchorProvider(connection, anchorWallet, {});
      const program = getProgram(provider);

      await program.methods
        .buyTicket()
        .accounts({
          mint: DEVNET_MINT_ADDRESS,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      await fetchTickets();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to buy ticket";
      setError(message);
    } finally {
      setBuying(false);
    }
  }, [publicKey, anchorWallet, connection, fetchTickets]);

  return {
    tickets,
    totalConsume,
    totalService,
    loading,
    buying,
    error,
    buyTicket,
    refetch: fetchTickets,
  };
}
