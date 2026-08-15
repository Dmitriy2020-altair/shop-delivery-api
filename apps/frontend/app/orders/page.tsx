import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="text-sm text-muted">
          Orders will be loaded from the Express API later.
        </p>
      </div>

      <div className="rounded-lg border border-dashed border-border bg-white px-4 py-10 text-center">
        <p className="text-sm text-muted">No orders to show yet.</p>
        <p className="mt-1 text-sm text-muted">
          This page is prepared for the future orders list.
        </p>
      </div>
    </div>
  );
}
