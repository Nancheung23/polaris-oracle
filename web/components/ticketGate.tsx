"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useUserTicket } from "@/hooks/useUserTicket";
import { Button } from "@/components/ui/button";
import { Sparkles, Ticket, Wallet } from "lucide-react";

export function TicketGate({ children }: { children: React.ReactNode }) {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { tickets, loading, buying, error, buyTicket } = useUserTicket();

  if (!connected) {
    return (
      <div className="rounded-xl border bg-white/70 backdrop-blur-sm p-10 text-center space-y-4">
        <Wallet className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">
          Please connect your wallet first.
        </p>
        <Button onClick={() => setVisible(true)}>Connect Wallet</Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white/70 backdrop-blur-sm p-10 text-center">
        <Sparkles className="h-6 w-6 mx-auto text-muted-foreground motion-safe:animate-pulse mb-3" />
        <p className="text-muted-foreground text-sm">
          Checking your ticket balance...
        </p>
      </div>
    );
  }

  if (tickets === 0) {
    return (
      <div className="rounded-xl border bg-white/70 backdrop-blur-sm p-10 text-center space-y-4">
        <Ticket className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">
          You don&apos;t have any reading tickets yet.
        </p>
        <Button onClick={buyTicket} disabled={buying}>
          {buying ? "Purchasing..." : "Buy 1 Ticket"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  return <>{children}</>;
}
