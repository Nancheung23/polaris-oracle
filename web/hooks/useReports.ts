"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export interface ReportSummary {
  _id: string;
  orderId: number;
  name: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

export function useReports() {
  const { publicKey } = useWallet();
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = useCallback(async () => {
    if (!publicKey) {
      setReports([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/reports?walletAddress=${publicKey.toBase58()}`,
      );
      const data = await res.json();
      setReports(data);
    } finally {
      setLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    queueMicrotask(() => fetchReports());
  }, [fetchReports]);

  return { reports, loading, refetch: fetchReports };
}
