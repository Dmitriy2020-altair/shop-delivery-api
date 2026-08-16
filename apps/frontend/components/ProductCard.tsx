"use client";

import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MockProduct } from "@/lib/mock/products";

type ProductCardProps = {
  product: MockProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <div className="flex min-h-0 flex-1 flex-col gap-(--card-spacing)">
        <div className="mx-(--card-spacing) aspect-[4/3] shrink-0 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 ring-1 ring-foreground/5" />
        <CardHeader className="gap-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="leading-snug">{product.name}</CardTitle>
            <Badge variant="secondary" className="shrink-0">
              {product.category}
            </Badge>
          </div>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              {product.available
                ? `${product.quantity} in stock`
                : "Out of stock"}
            </p>
          </div>
          <Badge variant={product.available ? "outline" : "destructive"}>
            {product.available ? "Available" : "Unavailable"}
          </Badge>
        </CardContent>
      </div>
      <CardFooter className="mt-auto">
        <Button className="w-full gap-1.5" disabled={!product.available}>
          <ShoppingCart className="size-4" aria-hidden />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
