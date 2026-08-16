import type { Metadata } from "next";
import { RegisterForm } from "@/components/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center py-4 sm:py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Get started with Shop Delivery in a few seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
