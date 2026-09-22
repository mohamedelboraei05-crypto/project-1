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
    <div className="space-y-0 border-2 border-[#168b55]">
      <div className="relative aspect-[1.02] overflow-hidden bg-[#ebe1d1] sm:aspect-[1.02]">
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
      </div>
      <div className="grid grid-cols-3 gap-1 bg-[#faf8f5]">
        {Array.from(
          { length: 3 },
          (_, index) => product.images[index % product.images.length],
        ).map((image, index) => (
          <button
            type="button"
            key={`${image}-${index}`}
            onClick={() => setSelectedImage(image)}
            className={`relative h-20 overflow-hidden bg-[#ebe1d1] ${
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
