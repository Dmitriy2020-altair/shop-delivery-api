import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
        <p className="text-sm text-muted">
          Create an account. Submit logic will connect to Express later.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-white p-5">
        <RegisterForm />
      </div>

      <p className="text-sm text-muted">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
