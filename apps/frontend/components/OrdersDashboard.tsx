"use client";

import { useCallback, useMemo, useState } from "react";
import { MoreHorizontal, ShoppingBag } from "lucide-react";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { OrdersSkeleton } from "@/components/states/PageSkeletons";
import {
  UiStatePreview,
  type UiPreviewMode,
} from "@/components/states/UiStatePreview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMockResource } from "@/hooks/useMockResource";
import { mockOrders, type MockOrder, type OrderStatus } from "@/lib/mock/orders";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function countByStatus(orders: MockOrder[], status: OrderStatus) {
  return orders.filter((order) => order.status === status).length;
}

export function OrdersDashboard() {
  const [preview, setPreview] = useState<UiPreviewMode>("live");
  const loadOrders = useCallback(() => mockOrders, []);
  const resource = useMockResource({ load: loadOrders });

  const orders = useMemo(() => resource.data ?? [], [resource.data]);

  const summary = [
    { label: "Pending", value: countByStatus(orders, "Pending") },
    { label: "Processing", value: countByStatus(orders, "Processing") },
    { label: "Delivered", value: countByStatus(orders, "Delivered") },
    { label: "Cancelled", value: countByStatus(orders, "Cancelled") },
  ] as const;

  const showLoading =
    preview === "loading" || (preview === "live" && resource.status === "loading");
  const showError =
    preview === "error" || (preview === "live" && resource.status === "error");
  const showEmpty =
    preview === "empty" ||
    (preview === "live" &&
      resource.status === "success" &&
      orders.length === 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <UiStatePreview value={preview} onChange={setPreview} />
      </div>

      {showLoading ? <OrdersSkeleton /> : null}

      {showError && !showLoading ? (
        <ErrorState
          title="Failed to load orders"
          message={
            resource.error ??
            "Unable to load orders right now. Please try again."
          }
          onRetry={() => {
            setPreview("live");
            resource.retry();
          }}
        />
      ) : null}

      {!showLoading && !showError && showEmpty ? (
        <EmptyState
          title="No orders yet"
          description="When you place an order, it will show up here with status and totals."
          icon={<ShoppingBag className="size-5" aria-hidden />}
        />
      ) : null}

      {!showLoading && !showError && !showEmpty ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {summary.map((item) => (
              <Card key={item.label} size="sm">
                <CardHeader className="pb-0">
                  <CardDescription>{item.label}</CardDescription>
                  <CardTitle className="text-2xl tabular-nums">
                    {item.value}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="hidden md:block">
            <CardHeader>
              <CardTitle>Recent orders</CardTitle>
              <CardDescription>
                Static preview data for layout and status badges.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{formatDate(order.date)}</TableCell>
                      <TableCell>
                        <OrderStatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="tabular-nums">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Actions for ${order.id}`}
                              />
                            }
                          >
                            <MoreHorizontal />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Track delivery</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="space-y-3 md:hidden">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-start justify-between gap-3">
                  <div>
                    <CardTitle>{order.id}</CardTitle>
                    <CardDescription>{formatDate(order.date)}</CardDescription>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-sm font-semibold tabular-nums">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
