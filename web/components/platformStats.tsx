"use client";

import { usePlatformStats } from "@/hooks/usePlatformStats";
import { usePlatformDbStats } from "@/hooks/usePlatformDbStats";
import { formatTokenAmount } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Sparkles, Coins, Flame } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function PlatformStats() {
  const { stats: chainStats, loading: chainLoading } = usePlatformStats();
  const { stats: dbStats, loading: dbLoading } = usePlatformDbStats();

  const loading = chainLoading || dbLoading;

  const items: {
    label: string;
    value: string | undefined;
    icon: LucideIcon;
    highlight?: boolean;
  }[] = [
    {
      label: "Wallets Connected",
      value: dbStats?.totalUsers.toLocaleString(),
      icon: Wallet,
    },
    {
      label: "Readings Generated",
      value: chainStats?.totalService.toLocaleString(),
      icon: Sparkles,
    },
    {
      label: "Tokens Consumed",
      value: chainStats
        ? formatTokenAmount(chainStats.totalConsume)
        : undefined,
      icon: Coins,
    },
    {
      label: "Tokens Burned",
      value: chainStats ? formatTokenAmount(chainStats.totalBurnt) : undefined,
      icon: Flame,
      highlight: true,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="text-center">
            <CardContent className="flex flex-col items-center gap-2 py-6">
              <Icon
                className={`h-5 w-5 ${
                  item.highlight ? "text-orange-600" : "text-muted-foreground"
                }`}
              />
              {loading || item.value === undefined ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                <p
                  className={`text-3xl font-bold ${
                    item.highlight ? "text-orange-600" : ""
                  }`}
                >
                  {item.value}
                </p>
              )}
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
