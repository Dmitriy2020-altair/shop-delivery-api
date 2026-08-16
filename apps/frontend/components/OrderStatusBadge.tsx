import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/lib/mock/orders";

const statusVariant: Record<
  OrderStatus,
  "secondary" | "outline" | "default" | "destructive"
> = {
  Pending: "secondary",
  Processing: "outline",
  Delivered: "default",
  Cancelled: "destructive",
};

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return <Badge variant={statusVariant[status]}>{status}</Badge>;
}
