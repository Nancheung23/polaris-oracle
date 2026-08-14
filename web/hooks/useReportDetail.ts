"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface ReportDetail {
  _id: string;
  orderId: number;
  name: string;
  status: "pending" | "completed" | "failed";
  reportContent?: {
    basic: string;
    overview: string;
    analysis: string;
    topics: Record<string, string>;
    details: string[];
    summary: string;
  };
}

const MAX_POLL_ATTEMPTS = 40;

export function useReportDetail(id: string | undefined) {
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const attemptsRef = useRef(0);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const fetchReport = useCallback(async () => {
    if (!id) return;
    const res = await fetch(`/api/reports/${id}`);
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data: ReportDetail = await res.json();
    setReport(data);
    setLoading(false);

    if (data.status !== "pending") {
      stopPolling();
      return;
    }

    attemptsRef.current += 1;
    if (attemptsRef.current >= MAX_POLL_ATTEMPTS) {
      stopPolling();
      setTimedOut(true);
    }
  }, [id, stopPolling]);

  useEffect(() => {
    attemptsRef.current = 0;
    queueMicrotask(() => setTimedOut(false));
    queueMicrotask(() => fetchReport());
    pollRef.current = setInterval(fetchReport, 5000);
    return stopPolling;
  }, [fetchReport, stopPolling]);

  return { report, loading, timedOut };
}
