import Link from "next/link";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Shop Delivery
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
