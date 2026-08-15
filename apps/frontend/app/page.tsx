import Link from "next/link";
import { CheckApiButton } from "@/components/CheckApiButton";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-muted">
          shop-delivery-api
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Shop Delivery
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          A full-stack shop and delivery demo. Browse products, place orders,
          and manage your profile through the Next.js client talking to the
          Express API.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            href: "/products",
            title: "Products",
            text: "Browse the catalog.",
          },
          {
            href: "/orders",
            title: "Orders",
            text: "Review your deliveries.",
          },
          {
            href: "/profile",
            title: "Profile",
            text: "Account details and role.",
          },
          {
            href: "/login",
            title: "Login",
            text: "Sign in to your account.",
          },
          {
            href: "/register",
            title: "Register",
            text: "Create a new account.",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-border bg-white p-4 transition-colors hover:border-ink/20"
          >
            <h2 className="font-medium">{item.title}</h2>
            <p className="mt-1 text-sm text-muted">{item.text}</p>
          </Link>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">API connectivity</h2>
        <p className="text-sm text-muted">
          Quick check against <code>GET /health</code> on the Express backend.
        </p>
        <CheckApiButton />
      </section>
    </div>
  );
}
