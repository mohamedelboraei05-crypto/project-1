"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { useProduct } from "@/features/products/hooks/useProduct";
import type { Product } from "@/features/products/types/product.types";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = productQuery.data;
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);

  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    return Object.fromEntries(
      product.options.map((option) => [
        option.id,
        selectedOptions[option.id] ?? option.values[0],
      ]),
    );
  }, [product, selectedOptions]);

  if (productQuery.isLoading) {
    return (
      <p className="px-5 py-16 text-sm text-zinc-600">Loading product...</p>
    );
  }

  if (!product) {
    return (
      <p className="px-5 py-16 text-sm text-zinc-600">Product not found.</p>
    );
  }

  return (
    <section className="mx-auto max-w-[1440px] bg-[#faf8f5] px-5 pb-20 sm:px-8 lg:px-20">
      <ProductBreadcrumbs />
      <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <ProductImages product={product} />
        <div className="space-y-7 lg:pt-5">
          <ProductDetails product={product} />
          <ProductOptions
            product={product}
            selectedOptions={resolvedOptions}
            onChange={(optionId, value) =>
              setSelectedOptions((current) => ({
                ...current,
                [optionId]: value,
              }))
            }
          />
          <div className="flex items-end gap-3 border-b border-[#dedbd5] pb-7">
            <div className="flex h-12 items-center border border-[#dedbd5]">
              <button
                type="button"
                className="h-full w-10 text-[#605a54] hover:text-[#1a1a1a]"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                type="button"
                className="h-full w-10 text-[#605a54] hover:text-[#1a1a1a]"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <div className="flex-1">
              {actions?.({
                product,
                selectedOptions: resolvedOptions,
                quantity,
                onQuantityChange: setQuantity,
              })}
            </div>
          </div>
          <div className="grid gap-5 border-b border-[#dedbd5] pb-7 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#605a54]">
                Scent profile
              </p>
              <p className="mt-3 text-sm leading-6 text-[#605a54]">
                {product.notes}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#605a54]">
                The composition
              </p>
              <p className="mt-3 text-sm leading-6 text-[#605a54]">
                Crafted for a lasting, intimate trail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
