// components/ticket-gate.tsx
"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useUserTicket } from "@/hooks/useUserTicket";
import { Button } from "@/components/ui/button";

export function TicketGate({ children }: { children: React.ReactNode }) {
  const { connected } = useWallet();
  const { tickets, loading, buying, error, buyTicket } = useUserTicket();

  if (!connected) {
    return (
      <p className="text-center text-muted-foreground">
        Please connect your wallet first.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-center text-muted-foreground">
        Checking your ticket balance...
      </p>
    );
  }

  if (tickets === 0) {
    return (
      <div className="text-center space-y-4">
        <p>You don&apos;t have any reading tickets yet.</p>
        <Button onClick={buyTicket} disabled={buying}>
          {buying ? "Purchasing..." : "Buy 1 Ticket"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  return <>{children}</>;
}