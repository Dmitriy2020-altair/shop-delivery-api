"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col justify-center py-10">
      <Alert variant="destructive" className="items-start">
        <AlertCircle className="size-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className="flex flex-col gap-3">
          <p>
            An unexpected error occurred while loading this page. You can try
            again, or return later if the problem continues.
          </p>
          {error.digest ? (
            <p className="font-mono text-xs opacity-80">
              Reference: {error.digest}
            </p>
          ) : null}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit border-destructive/30 bg-background text-foreground hover:bg-muted"
            onClick={reset}
          >
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
