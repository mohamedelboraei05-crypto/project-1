import type { Product } from "@/features/products/types/product.types";
import { formatPrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
};

/** US-04: product information. */
export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="border-b border-[#e5e0d8] pb-5">
      <h1 className="font-(family-name:--font-instrument-serif) text-[42px] leading-[0.95] tracking-[-0.04em] text-[#1a1a1a] sm:text-[54px]">
        {product.name}
      </h1>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[24px] leading-none text-[#1a1a1a]">
          {formatPrice(product.price)}
        </p>
        <span className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.08em] text-[#2d9d73]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#2d9d73]" aria-hidden="true" />
          Available in Atelier
        </span>
      </div>
    </div>
  );
}
