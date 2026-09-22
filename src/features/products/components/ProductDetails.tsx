import type { Product } from "@/features/products/types/product.types";
import { formatPrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
};

/** US-04: product information. */
export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="border-b border-[#dedbd5] pb-7">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#77716a]">
        {product.category}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-instrument-serif)] text-5xl leading-none text-[#1a1a1a] sm:text-6xl">
        {product.name}
      </h1>
      <p className="mt-5 text-xl text-[#1a1a1a]">
        {formatPrice(product.price)}
      </p>
      <p className="mt-6 max-w-lg text-sm leading-7 text-[#605a54]">
        {product.description}
      </p>
    </div>
  );
}
