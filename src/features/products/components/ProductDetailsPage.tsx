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

    if (product.options.length === 0) {
      return {
        size: selectedOptions.size ?? "30 ml",
      };
    }

    return Object.fromEntries(
      product.options.map((option) => [
        option.id,
        selectedOptions[option.id] ?? option.values[0].value,
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
      <section className="mx-auto max-w-[1220px] px-8 pb-16 pt-4 lg:px-12">
        <ProductBreadcrumbs />
        <div className="grid gap-6 pt-3 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          {/* Image Column - Made sticky on large screens */}
          <div className="max-w-[620px] lg:sticky lg:top-6 lg:self-start">
            <ProductImages product={product} />
          </div>

          {/* Details Column */}
          <div className="pt-1">
            {/* Scent Family / Occasion Bar */}
            <div className="flex gap-5 border-b border-[#e5e0d8] pb-4 text-[9px] font-semibold uppercase tracking-[0.16em]">
              <span className="text-[#1a1a1a]">
                Scent family: {product.scentFamily}
              </span>
              <span className="text-[#aaa69e]">Occasion: Everyday</span>
            </div>

            {/* Product Title & Price */}
            <div className="pt-5">
              <ProductDetails product={product} />
            </div>

            {/* Volume Options - Increased spacing from price */}
            <div className="mt-7">
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

            {/* Gift Wrapping Toggle - Increased spacing */}
            <label className="mt-5 flex cursor-pointer items-center justify-between border border-[#e5e0d8] bg-[#f5f1ea] px-4 py-3">
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.02em] text-[#1a1a1a]">
                  Complimentary Signature Gift Wrapping
                </span>
                <span className="mt-1 block text-[8px] text-[#77716a]">
                  Wrapped in our signature cloth with a handwritten note.
                </span>
              </span>

              {/* Toggle Switch */}
              <span className="relative inline-flex h-6 w-11 items-center">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(event) => setGiftWrap(event.target.checked)}
                  className="peer sr-only"
                  aria-label="Add complimentary gift wrapping"
                />

                {/* Background - changes color based on state */}
                <span className="flex h-6 w-11 items-center rounded-[100px] border border-[#e5e0d8] bg-[#e5e0d8] p-0.5 transition-colors peer-checked:border-[#C5A880] peer-checked:bg-[#C5A880]" />

                {/* Knob - moves based on state */}
                <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
              </span>
            </label>

            {/* Quantity & Add to Cart - Increased spacing */}
            <div className="mt-5 flex h-10 gap-3">
              <div className="flex items-center justify-between border border-[#e5e0d8] bg-[#f8f5f1] px-3 text-[10px] text-[#1a1a1a]">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  aria-label="Decrease quantity"
                  className="px-1 text-base leading-none"
                >
                  −
                </button>
                <span className="min-w-4 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                  className="px-1 text-base leading-none"
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

            {/* Scent Anatomy - Increased spacing from Add to Cart */}
            <div className="mt-10 border-b border-[#e5e0d8] pb-6">
              <h2 className="font-(family-name:--font-instrument-serif) text-[32px] leading-none text-[#1a1a1a]">
                Scent Anatomy
              </h2>
              <p className="mt-4 max-w-xl text-[10px] leading-5 text-[#77716a]">
                {product.description} The scent evolves with a warm, luminous
                trail that opens with bright top notes, settling into a rich
                dry-down.
              </p>
              <dl className="mt-6 space-y-3 text-[9px] uppercase tracking-[0.08em] text-[#1a1a1a]">
                <div className="flex justify-between border-b border-[#eeeae4] pb-3">
                  <dt>Top notes</dt>
                  <dd className="text-right text-[#77716a]">
                    Bergamot, Pink Pepper
                  </dd>
                </div>
                <div className="flex justify-between border-b border-[#eeeae4] pb-3">
                  <dt>Heart notes</dt>
                  <dd className="text-right text-[#77716a]">
                    Cardamom, Sandalwood
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Base notes</dt>
                  <dd className="text-right text-[#77716a]">
                    Musk, Cedarwood, Tonka
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Olfactory Companions Section */}
      <section className="bg-[#f3efe8] px-8 py-12 lg:px-20">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="text-center font-(family-name:--font-instrument-serif) text-[40px] leading-none text-[#1a1a1a]">
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