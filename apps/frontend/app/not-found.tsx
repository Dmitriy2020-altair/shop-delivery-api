import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col justify-center py-10">
      <Card>
        <CardHeader className="space-y-3 text-center sm:text-left">
          <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground sm:mx-0">
            <SearchX className="size-5" aria-hidden />
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              404
            </p>
            <CardTitle className="text-xl">Page not found</CardTitle>
            <CardDescription>
              The page you are looking for does not exist or may have been
              moved.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={cn(buttonVariants(), "gap-1.5")}>
            <Home className="size-4" aria-hidden />
            Back to Home
          </Link>
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Browse products
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
