import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center py-4 sm:py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to manage products, orders, and your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
