import Link from "next/link";
import { Package } from "lucide-react";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Package className="size-3.5" aria-hidden />
          </span>
          Shop Delivery
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
