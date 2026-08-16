import { OrdersSkeleton } from "@/components/states/PageSkeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersLoading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-live="polite">
      <div className="space-y-2">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      <OrdersSkeleton />
    </div>
  );
}
