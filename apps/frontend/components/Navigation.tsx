import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/orders", label: "Orders" },
  { href: "/profile", label: "Profile" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
] as const;

export function Navigation() {
  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
