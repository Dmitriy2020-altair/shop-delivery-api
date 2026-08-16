import { ProductCard } from "@/components/ProductCard";
import type { MockProduct } from "@/lib/mock/products";

type ProductGridProps = {
  products: MockProduct[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id} className="h-full">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
