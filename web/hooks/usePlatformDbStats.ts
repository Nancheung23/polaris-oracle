"use client";

import { useState, useEffect } from "react";

interface DbStats {
  totalUsers: number;
  totalReports: number;
}

export function usePlatformDbStats() {
  const [stats, setStats] = useState<DbStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}
