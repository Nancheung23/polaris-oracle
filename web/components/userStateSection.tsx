"use client";

import { useUserTicket } from "@/hooks/useUserTicket";
import { formatTokenAmount } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Coins, Gift } from "lucide-react";

export function UserStatsSection() {
  const { totalConsume, totalService, loading } = useUserTicket();

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardContent className="py-6 text-center">
            <Sparkles className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
            {loading || totalService === null ? (
              <div className="h-7 w-12 mx-auto bg-muted animate-pulse rounded" />
            ) : (
              <p className="text-2xl font-bold">{totalService}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Readings Generated
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm">
          <CardContent className="py-6 text-center">
            <Coins className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
            {loading || totalConsume === null ? (
              <div className="h-7 w-16 mx-auto bg-muted animate-pulse rounded" />
            ) : (
              <p className="text-2xl font-bold">
                {formatTokenAmount(totalConsume)}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Tokens Consumed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-dashed">
          <CardContent className="py-6 text-center">
            <Gift className="h-5 w-5 mx-auto mb-2 text-amber-500" />
            <p className="text-sm font-medium text-muted-foreground">
              Airdrop Eligibility
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Upcoming feature
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
