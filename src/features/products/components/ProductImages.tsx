"use client";

import Image from "next/image";
import { useState } from "react";

import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery. */
export function ProductImages({ product }: ProductImagesProps) {
  const mainImage = product.images[0] ?? "";
  const subImages = product.images.slice(1, 4);

  const [selectedImage, setSelectedImage] = useState(mainImage);

  if (!selectedImage) {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg bg-[#ebe6de] text-[#605a54]">
        No product images yet
      </div>
    );
  }

  return (
    <div className="border-[2px] border-[#1d7ec9] bg-[#efe7db] p-0 shadow-[0_0_0_1px_rgba(29,126,201,0.12)]">
      {/* Main Image */}
      <div className="relative aspect-[0.92] overflow-hidden bg-[#e7ddca]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_45%)]" />

        <Image
          src={selectedImage}
          alt={product.name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
      </div>

      {/* Sub Images */}
      {subImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2 bg-[#f4efe7] p-2">
          {subImages.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              onClick={() => setSelectedImage(image)}
              className={`relative h-[86px] overflow-hidden border bg-[#e7ddca] ${selectedImage === image
                  ? "border-[#1a1a1a]"
                  : "border-transparent opacity-90"
                }`}
              aria-label={`View ${product.name} image ${index + 2}`}
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
      )}
    </div>
  );
}