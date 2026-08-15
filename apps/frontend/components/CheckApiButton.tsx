"use client";

import { useState } from "react";

type HealthResponse = {
  status: string;
};

export function CheckApiButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function checkApi() {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/health");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as HealthResponse;
      setResult(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to reach API";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3 rounded-lg border border-border bg-white p-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={checkApi}
          disabled={loading}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Checking..." : "Check API"}
        </button>
        {loading && <p className="text-sm text-muted">Loading...</p>}
      </div>

      {error && (
        <p className="text-sm text-danger" role="alert">
          Error: {error}
        </p>
      )}

      {result && (
        <pre className="overflow-x-auto rounded-md bg-surface p-3 text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
