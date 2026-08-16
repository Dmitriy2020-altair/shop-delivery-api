"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldErrors = {
  email?: string;
  password?: string;
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);
    setApiError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const nextErrors: FieldErrors = {};
    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    window.setTimeout(() => {
      setSubmitting(false);

      // UI-only simulated API failure — replace with real auth later.
      if (email.toLowerCase() === "fail@example.com") {
        setApiError("Invalid email or password. Please try again.");
        return;
      }

      setSuccess(true);
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          disabled={submitting}
          aria-invalid={Boolean(fieldErrors.email)}
        />
        {fieldErrors.email ? (
          <p className="text-xs text-destructive" role="alert">
            {fieldErrors.email}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Use the email associated with your Shop Delivery account.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="password">Password</Label>
          <button
            type="button"
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            disabled={submitting}
            className="pr-10"
            aria-invalid={Boolean(fieldErrors.password)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-1/2 right-1 -translate-y-1/2"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={submitting}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        {fieldErrors.password ? (
          <p className="text-xs text-destructive" role="alert">
            {fieldErrors.password}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="remember"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked === true)}
          disabled={submitting}
        />
        <Label htmlFor="remember" className="font-normal text-muted-foreground">
          Remember me
        </Label>
      </div>

      {apiError ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Sign in failed</AlertTitle>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      ) : null}

      {success ? (
        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">
          <CheckCircle2 className="size-4 text-emerald-600" />
          <AlertTitle>Signed in</AlertTitle>
          <AlertDescription>
            UI-only success — API sign-in will be connected later.
          </AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" className="w-full" disabled={submitting} size="lg">
        {submitting ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Create one
        </Link>
      </p>
      <p className="text-center text-xs text-muted-foreground">
        Tip: use <code>fail@example.com</code> to preview the API error state.
      </p>
    </form>
  );
}
