"use client";

import { useCallback, useMemo, useState } from "react";
import { Package, Search } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { ProductsSkeleton } from "@/components/states/PageSkeletons";
import {
  UiStatePreview,
  type UiPreviewMode,
} from "@/components/states/UiStatePreview";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMockResource } from "@/hooks/useMockResource";
import {
  mockProducts,
  productCategories,
  type MockProduct,
} from "@/lib/mock/products";

type SortOption = "name-asc" | "price-asc" | "price-desc";

function sortProducts(products: MockProduct[], sort: SortOption) {
  const next = [...products];
  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => a.price - b.price);
    case "price-desc":
      return next.sort((a, b) => b.price - a.price);
    case "name-asc":
    default:
      return next.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export function ProductsCatalog() {
  const [preview, setPreview] = useState<UiPreviewMode>("live");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortOption>("name-asc");

  const loadProducts = useCallback(() => mockProducts, []);
  const resource = useMockResource({ load: loadProducts });

  const filtered = useMemo(() => {
    const source = resource.data ?? [];
    const normalized = query.trim().toLowerCase();
    const byQuery = source.filter((product) => {
      const matchesQuery =
        normalized.length === 0 ||
        product.name.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized);
      const matchesCategory =
        category === "All" || product.category === category;
      return matchesQuery && matchesCategory;
    });
    return sortProducts(byQuery, sort);
  }, [resource.data, query, category, sort]);

  const showLoading =
    preview === "loading" || (preview === "live" && resource.status === "loading");
  const showError =
    preview === "error" || (preview === "live" && resource.status === "error");
  const showEmpty =
    preview === "empty" ||
    (preview === "live" &&
      resource.status === "success" &&
      filtered.length === 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <UiStatePreview value={preview} onChange={setPreview} />
      </div>

      <div className="grid gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
          <Label htmlFor="product-search">Search</Label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="product-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              className="pl-8"
              disabled={showLoading || showError}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-category">Category</Label>
          <Select
            value={category}
            onValueChange={(value) => {
              if (value != null) setCategory(value);
            }}
            disabled={showLoading || showError}
          >
            <SelectTrigger id="product-category" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-sort">Sort</Label>
          <Select
            value={sort}
            onValueChange={(value) => {
              if (
                value === "name-asc" ||
                value === "price-asc" ||
                value === "price-desc"
              ) {
                setSort(value);
              }
            }}
            disabled={showLoading || showError}
          >
            <SelectTrigger id="product-sort" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name A–Z</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showLoading ? <ProductsSkeleton /> : null}

      {showError && !showLoading ? (
        <ErrorState
          title="Failed to load products"
          message={
            resource.error ??
            "Unable to load products right now. Please try again."
          }
          onRetry={() => {
            setPreview("live");
            resource.retry();
          }}
        />
      ) : null}

      {!showLoading && !showError && showEmpty ? (
        <EmptyState
          title="No products found"
          description="Try adjusting search or filters, or check back later."
          icon={<Package className="size-5" aria-hidden />}
        />
      ) : null}

      {!showLoading && !showError && !showEmpty ? (
        <ProductGrid products={filtered} />
      ) : null}
    </div>
  );
}
