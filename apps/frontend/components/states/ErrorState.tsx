import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
};

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <Alert variant="destructive" className={cn("items-start", className)}>
      <AlertCircle className="size-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        <p>{message}</p>
        {onRetry ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit border-destructive/30 bg-background text-foreground hover:bg-muted"
            onClick={onRetry}
          >
            Retry
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}
