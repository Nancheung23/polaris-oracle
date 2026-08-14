"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { useReports } from "@/hooks/useReports";
import { useUserTicket } from "@/hooks/useUserTicket";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Ticket, ArrowRight } from "lucide-react";

export default function ReadingDashboard() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { reports, loading } = useReports();
  const { tickets, buying, buyTicket, error } = useUserTicket();

  if (!connected) {
    return (
      <div className="relative isolate overflow-hidden min-h-[60vh] flex items-center justify-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-amber-50" />
          <div className="absolute top-0 left-1/3 h-95 w-95 rounded-full bg-indigo-200/50 blur-3xl motion-safe:animate-[float-a_16s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 right-1/3 h-95 w-95 rounded-full bg-amber-200/40 blur-3xl motion-safe:animate-[float-b_18s_ease-in-out_infinite]" />
        </div>
        <div className="text-center space-y-4">
          <Sparkles className="h-8 w-8 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">
            Connect your wallet to see your readings.
          </p>
          <Button onClick={() => setVisible(true)}>Connect Wallet</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-amber-50" />
        <div className="absolute -top-20 -left-20 h-140 w-140 rounded-full bg-indigo-200/50 blur-3xl motion-safe:animate-[float-a_16s_ease-in-out_infinite]" />
        <div className="absolute top-10 -right-20 h-125 w-125 rounded-full bg-amber-200/40 blur-3xl motion-safe:animate-[float-b_18s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/3 h-115 w-115 rounded-full bg-rose-100/50 blur-3xl motion-safe:animate-[float-c_20s_ease-in-out_infinite]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-white" />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-3xl font-bold mb-6">Your Readings</h1>

            {loading && (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-20 rounded-xl border bg-white/70 animate-pulse"
                  />
                ))}
              </div>
            )}

            {!loading && reports.length === 0 && (
              <div className="text-center py-16 rounded-2xl border bg-white/70 backdrop-blur-sm">
                <Sparkles className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">
                  You don&apos;t have any readings yet.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start your first one from the panel on the right.
                </p>
              </div>
            )}

            <div className="space-y-3">
              {reports.map((r) => (
                <Link
                  key={r._id}
                  href={`/reading/${r._id}`}
                  className="group flex items-center justify-between rounded-xl border bg-white/70 backdrop-blur-sm px-5 py-4 hover:border-primary/40 hover:bg-white transition-all"
                >
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={r.status} />
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Card className="bg-white/70 backdrop-blur-sm border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                  Your Tickets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-4xl font-bold">{tickets ?? 0}</p>
                <Button
                  onClick={buyTicket}
                  disabled={buying}
                  className="w-full"
                >
                  {buying ? "Purchasing..." : "Buy Ticket"}
                </Button>
                {error && <p className="text-xs text-red-500">{error}</p>}
              </CardContent>
            </Card>

            <Link href="/reading/new">
              <Button
                className="w-full h-11"
                variant={tickets ? "default" : "secondary"}
                disabled={!tickets}
              >
                + New Reading
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    completed: "bg-emerald-100 text-emerald-800",
    failed: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
        styles[status] ?? ""
      }`}
    >
      {status}
    </span>
  );
}
