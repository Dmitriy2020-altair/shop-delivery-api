import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function ProductsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className="h-full">
          <Card className="h-full">
            <Skeleton className="mx-4 aspect-[4/3] rounded-lg" />
            <CardHeader className="gap-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent className="flex justify-between">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-full" />
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function OrdersSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Card key={index} size="sm">
            <CardHeader className="gap-2 pb-0">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-10" />
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="size-14 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-56" />
            <Skeleton className="h-4 w-40" />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-8 w-28" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
