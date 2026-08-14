"use client";

import { useState } from "react";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { usePlatformStats } from "@/hooks/usePlatformStats";
import { formatTokenAmount } from "@/lib/format";
import { Copy, Check, ExternalLink, Coins, Layers, Flame } from "lucide-react";

export function TokenInfoSection() {
  const { totalSupply, loading: tokenLoading, mintAddress } = useTokenInfo();
  const { stats: platformStats, loading: statsLoading } = usePlatformStats();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(mintAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shortAddress = `${mintAddress.slice(0, 6)}...${mintAddress.slice(-6)}`;
  const explorerUrl = `https://solscan.io/token/${mintAddress}?cluster=devnet`;

  const stats = [
    {
      label: "Total Supply",
      value:
        tokenLoading || totalSupply === null
          ? null
          : totalSupply.toLocaleString(),
      icon: Layers,
    },
    {
      label: "Price per Reading",
      value:
        statsLoading || !platformStats
          ? null
          : `${formatTokenAmount(platformStats.price)} tokens`,
      icon: Coins,
    },
    {
      label: "Burn Rate",
      value: statsLoading || !platformStats ? null : `${platformStats.rate}%`,
      icon: Flame,
      highlight: true,
    },
  ];

  return (
    <section className="relative isolate container mx-auto px-4 py-24 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/4 h-95 w-95 rounded-full bg-indigo-100/60 blur-3xl motion-safe:animate-[float-a_16s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-1/4 h-105 w-105 rounded-full bg-amber-100/60 blur-3xl motion-safe:animate-[float-b_18s_ease-in-out_infinite]" />
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border bg-white/80 backdrop-blur-sm p-8 sm:p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">
              Polaris Oracle Token $POT
            </h2>
            <p className="text-muted-foreground">
              Every reading burns a portion of its cost, permanently reducing
              supply.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border bg-white/70 px-5 py-4 mb-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Contract Address
              </p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 font-mono text-sm hover:text-primary transition"
              >
                {shortAddress}
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition"
            >
              View on Solscan
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-white/70 px-5 py-5 text-center"
                >
                  <Icon
                    className={`h-5 w-5 mx-auto mb-2 ${
                      stat.highlight
                        ? "text-orange-600"
                        : "text-muted-foreground"
                    }`}
                  />
                  {stat.value === null ? (
                    <div className="h-6 w-16 mx-auto bg-muted animate-pulse rounded" />
                  ) : (
                    <p
                      className={`text-xl font-bold ${
                        stat.highlight ? "text-orange-600" : ""
                      }`}
                    >
                      {stat.value}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
