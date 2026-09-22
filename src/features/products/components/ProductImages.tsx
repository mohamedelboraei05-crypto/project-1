import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery. */
export function ProductImages({ product }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  if (!selectedImage) {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg bg-[#ebe6de] text-[#605a54]">
        No product images yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[0.92] overflow-hidden bg-[#ebe1d1] sm:aspect-square">
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {product.images.map((image) => (
          <button
            type="button"
            key={image}
            onClick={() => setSelectedImage(image)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden bg-[#ebe1d1] ${
              selectedImage === image ? "ring-1 ring-[#1a1a1a]" : ""
            }`}
            aria-label={`View ${product.name}`}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
