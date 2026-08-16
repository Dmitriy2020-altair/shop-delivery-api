import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { OrdersDashboard } from "@/components/OrdersDashboard";

export const metadata: Metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return (
    <div>
      <PageHeader
        title="Orders"
        description="Monitor delivery status across your recent orders."
      />
      <OrdersDashboard />
    </div>
  );
}
