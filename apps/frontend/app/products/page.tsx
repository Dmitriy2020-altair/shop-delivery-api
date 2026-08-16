import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductsCatalog } from "@/components/ProductsCatalog";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <div>
      <PageHeader
        title="Products"
        description="Browse the catalog. Data is UI mock data until the API is connected."
      />
      <ProductsCatalog />
    </div>
  );
}
