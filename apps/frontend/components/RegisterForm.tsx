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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApiError(null);
    setSuccess(false);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

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
    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
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
        setApiError("An account with this email already exists.");
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
            We&apos;ll use this address for order updates and account access.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
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
        ) : (
          <p className="text-xs text-muted-foreground">
            Use at least 8 characters with a mix of letters and numbers.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            required
            disabled={submitting}
            className="pr-10"
            aria-invalid={Boolean(fieldErrors.confirmPassword)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-1/2 right-1 -translate-y-1/2"
            onClick={() => setShowConfirm((value) => !value)}
            aria-label={
              showConfirm ? "Hide confirm password" : "Show confirm password"
            }
            disabled={submitting}
          >
            {showConfirm ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        {fieldErrors.confirmPassword ? (
          <p className="text-xs text-destructive" role="alert">
            {fieldErrors.confirmPassword}
          </p>
        ) : null}
      </div>

      {apiError ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Registration failed</AlertTitle>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      ) : null}

      {success ? (
        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">
          <CheckCircle2 className="size-4 text-emerald-600" />
          <AlertTitle>Account created</AlertTitle>
          <AlertDescription>
            UI-only success — registration API will be connected later.
          </AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" className="w-full" disabled={submitting} size="lg">
        {submitting ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
      <p className="text-center text-xs text-muted-foreground">
        Tip: use <code>fail@example.com</code> to preview the API error state.
      </p>
    </form>
  );
}
