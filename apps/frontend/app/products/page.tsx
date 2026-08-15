import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

const placeholderProducts = [
  { name: "Sample product A", price: "12.99", category: "Grocery" },
  { name: "Sample product B", price: "8.50", category: "Drinks" },
  { name: "Sample product C", price: "24.00", category: "Household" },
] as const;

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-sm text-muted">
          Product list will come from <code>GET /products</code> later.
        </p>
      </div>

      <p className="rounded-md border border-dashed border-border bg-white px-3 py-2 text-sm text-muted">
        Temporary UI placeholders for layout only — not a mock API and not real
        data.
      </p>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderProducts.map((product) => (
          <li
            key={product.name}
            className="rounded-lg border border-border bg-white p-4"
          >
            <h2 className="font-medium">{product.name}</h2>
            <p className="mt-1 text-sm text-muted">{product.category}</p>
            <p className="mt-3 text-sm font-medium">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
