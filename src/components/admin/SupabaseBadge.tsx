"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type Status = "loading" | "connected" | "disconnected";

interface SupabaseStatus {
  connected: boolean;
  error?: string;
  url?: string;
}

export default function SupabaseBadge() {
  const [status, setStatus] = useState<Status>("loading");
  const [details, setDetails] = useState<SupabaseStatus | null>(null);

  useEffect(() => {
    fetch("/api/admin/supabase-status")
      .then((r) => r.json())
      .then((data: SupabaseStatus) => {
        setDetails(data);
        setStatus(data.connected ? "connected" : "disconnected");
      })
      .catch(() => setStatus("disconnected"));
  }, []);

  if (status === "loading") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
        <Loader2 className="w-3 h-3 animate-spin" />
        Checking Supabase...
      </span>
    );
  }

  if (status === "connected") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
        <CheckCircle className="w-3.5 h-3.5" />
        Supabase Connected
      </span>
    );
  }

  return (
    <span
      title={details?.error ?? "Could not reach Supabase"}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full cursor-help"
    >
      <XCircle className="w-3.5 h-3.5" />
      Supabase Disconnected
    </span>
  );
}
