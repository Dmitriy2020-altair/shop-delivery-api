export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Delivered"
  | "Cancelled";

export type MockOrder = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: number;
};

export const mockOrders: MockOrder[] = [
  {
    id: "ORD-1042",
    date: "2026-08-14",
    status: "Delivered",
    total: 48.2,
    items: 4,
  },
  {
    id: "ORD-1041",
    date: "2026-08-13",
    status: "Processing",
    total: 19.75,
    items: 2,
  },
  {
    id: "ORD-1040",
    date: "2026-08-12",
    status: "Pending",
    total: 62.1,
    items: 5,
  },
  {
    id: "ORD-1039",
    date: "2026-08-10",
    status: "Cancelled",
    total: 12.5,
    items: 1,
  },
  {
    id: "ORD-1038",
    date: "2026-08-08",
    status: "Delivered",
    total: 33.4,
    items: 3,
  },
];
