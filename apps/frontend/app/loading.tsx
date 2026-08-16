import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-live="polite">
      <div className="space-y-3">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-4 w-2/3 max-w-md" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
          >
            <Skeleton className="size-9 rounded-lg" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-64 max-w-full" />
        <Skeleton className="h-8 w-28" />
      </div>
    </div>
  );
}
