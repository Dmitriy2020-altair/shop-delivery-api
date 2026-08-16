"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LogIn,
  Menu,
  Package,
  ShoppingBag,
  User,
  UserPlus,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const mainLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
  { href: "/profile", label: "Profile", icon: User },
] as const;

const authLinks = [
  { href: "/login", label: "Login", icon: LogIn },
  { href: "/register", label: "Register", icon: UserPlus },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      {label}
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
        {mainLinks.map((link) => (
          <NavLink
            key={link.href}
            {...link}
            active={isActive(pathname, link.href)}
          />
        ))}
        <div className="mx-2 h-5 w-px bg-border" aria-hidden />
        {authLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              buttonVariants({
                variant: link.href === "/register" ? "default" : "outline",
                size: "sm",
              }),
              "gap-1.5"
            )}
          >
            <link.icon className="size-3.5" aria-hidden />
            {link.label}
          </Link>
        ))}
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            />
          }
        >
          <Menu className="size-4" />
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] p-0">
          <SheetHeader className="border-b px-4 py-4 text-left">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav aria-label="Mobile" className="flex flex-col gap-1 p-3">
            {mainLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                active={isActive(pathname, link.href)}
                onNavigate={() => setOpen(false)}
              />
            ))}
            <div className="my-2 h-px bg-border" />
            {authLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                active={isActive(pathname, link.href)}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
