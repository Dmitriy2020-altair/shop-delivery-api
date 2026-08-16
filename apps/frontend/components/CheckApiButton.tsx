"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { HealthResponse } from "@/lib/api/types";

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
    <Card>
      <CardHeader>
        <CardTitle>API connectivity</CardTitle>
        <CardDescription>
          Quick check against <code className="text-xs">GET /health</code> on
          the Express backend.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button type="button" onClick={checkApi} disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
              Checking...
            </>
          ) : (
            "Check API"
          )}
        </Button>

        {result ? (
          <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <AlertTitle>API is online</AlertTitle>
            <AlertDescription>
              Health status: {result.status}
            </AlertDescription>
          </Alert>
        ) : null}

        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Unable to connect to API</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}
      </CardContent>
    </Card>
  );
}
