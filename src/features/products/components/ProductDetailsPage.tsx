"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useProduct } from "@/features/products/hooks/useProduct";
import { mockProducts } from "@/features/products/services/products.mock-data";
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
  const [giftWrap, setGiftWrap] = useState(false);

  const resolvedOptions = useMemo(() => {
    if (!product) return selectedOptions;
    return Object.fromEntries(
      product.options.map((option) => [
        option.id,
        selectedOptions[option.id] ?? option.values[0],
      ]),
    );
  }, [product, selectedOptions]);

  if (productQuery.isLoading) {
    return (
      <p className="px-8 py-16 text-xs text-[#605a54]">Loading product...</p>
    );
  }
  if (!product) {
    return (
      <p className="px-8 py-16 text-xs text-[#605a54]">Product not found.</p>
    );
  }

  const companions = mockProducts
    .filter((item) => item.id !== product.id && item.id !== "atelier-oud")
    .slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-8 pb-16 lg:px-20">
        <ProductBreadcrumbs />
        <div className="grid gap-8 lg:grid-cols-[1fr_0.86fr] lg:gap-12">
          <ProductImages product={product} />
          <div className="pt-1">
            <div className="flex gap-5 border-b border-[#e5e0d8] pb-5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#1a1a1a]">
                Scent family: {product.scentFamily}
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#aaa69e]">
                Occasion: Everyday
              </span>
            </div>
            <ProductDetails product={product} />
            <div className="mt-4">
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
            </div>
            <label className="mt-3 flex cursor-pointer items-center justify-between border border-[#e5e0d8] bg-[#f5f1ea] px-4 py-3">
              <span>
                <span className="block text-[9px] font-semibold">
                  Complimentary Signature Gift Wrapping
                </span>
                <span className="mt-1 block text-[8px] text-[#77716a]">
                  Wrapped in our signature cloth with a handwritten note.
                </span>
              </span>
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(event) => setGiftWrap(event.target.checked)}
                className="size-4 accent-[#c5a880]"
                aria-label="Add complimentary gift wrapping"
              />
            </label>
            <div className="mt-3 flex h-9 gap-3">
              <div className="flex items-center border border-[#e5e0d8] px-3 text-[10px]">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  type="button"
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
            <div className="mt-7 border-b border-[#e5e0d8] pb-5">
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl">
                Scent Anatomy
              </h2>
              <p className="mt-3 max-w-xl text-[9px] leading-4 text-[#77716a]">
                {product.description} The scent evolves with a warm, luminous
                trail that opens with bright top notes, settling into a rich
                dry-down.
              </p>
              <dl className="mt-5 space-y-2 text-[8px] uppercase tracking-[0.08em]">
                <div className="flex justify-between border-b border-[#eeeae4] pb-2">
                  <dt>Top notes</dt>
                  <dd className="text-[#77716a]">Bergamot, Pink Pepper</dd>
                </div>
                <div className="flex justify-between border-b border-[#eeeae4] pb-2">
                  <dt>Heart notes</dt>
                  <dd className="text-[#77716a]">Cardamom, Sandalwood</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Base notes</dt>
                  <dd className="text-[#77716a]">Musk, Cedarwood, Tonka</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f3efe8] px-8 py-12 lg:px-20">
        <div className="mx-auto max-w-[1360px]">
          <h2 className="text-center font-[family-name:var(--font-instrument-serif)] text-3xl">
            Olfactory Companions
          </h2>
          <p className="mt-2 text-center text-[8px] uppercase tracking-[0.12em] text-[#aaa69e]">
            Fragrances to synergise your collection
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {companions.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
