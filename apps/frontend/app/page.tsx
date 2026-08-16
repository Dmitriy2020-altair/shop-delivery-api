import Link from "next/link";
import {
  ArrowRight,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import { CheckApiButton } from "@/components/CheckApiButton";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    href: "/products",
    title: "Products",
    description: "Browse the catalog, filter by category, and prepare carts.",
    icon: Package,
  },
  {
    href: "/orders",
    title: "Orders",
    description: "Track deliveries, review status, and manage fulfillment.",
    icon: ShoppingBag,
  },
  {
    href: "/profile",
    title: "Profile",
    description: "View account details, role, and security preferences.",
    icon: User,
  },
] as const;

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Shop Delivery
          </p>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Operate your shop and deliveries from one clean dashboard.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            A modern UI for browsing products, reviewing orders, and managing
            your account — ready to connect to the Express API.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/products"
            className={cn(buttonVariants({ size: "lg" }), "gap-1.5")}
          >
            Browse products
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/register"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Create account
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href} className="group">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="size-4" aria-hidden />
                </div>
                <CardTitle className="flex items-center gap-2">
                  {feature.title}
                  <ArrowRight
                    className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>

      <section>
        <CheckApiButton />
      </section>
    </div>
  );
}
