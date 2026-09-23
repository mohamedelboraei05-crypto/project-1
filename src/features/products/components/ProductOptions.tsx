"use client";

import type { Product } from "@/features/products/types/product.types";

type ProductOptionsProps = {
  product: Product;
  selectedOptions: Record<string, string>;
  onChange: (optionId: string, value: string) => void;
};

/** US-04: selectable product options. */
export function ProductOptions({
  product,
  selectedOptions,
  onChange,
}: ProductOptionsProps) {
  const optionGroups =
    product.options.length > 0
      ? product.options
      : [
        {
          id: "size",
          name: "Volume",
          values: [
            { value: "30 ml", price: Math.round(product.price * 0.65) },
            { value: "50 ml", price: Math.round(product.price * 0.82) },
            { value: "100 ml", price: product.price },
          ],
        },
      ];

  return (
    <div className="space-y-4">
      {optionGroups.map((option) => (
        <fieldset key={option.id}>
          <legend className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#605a54]">
            Select {option.name}
          </legend>

          <div className="grid grid-cols-3 gap-2">
            {option.values.map((optionValue) => {
              const isSelected =
                selectedOptions[option.id] === optionValue.value;

              return (
                <button
                  key={optionValue.value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onChange(option.id, optionValue.value)}
                  className={[
                    "flex h-[52px] flex-col items-center justify-center border bg-[#f5f1ea] text-center transition-colors",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1a1a1a]",
                    isSelected
                      ? "border-[#1a1a1a] bg-transparent font-bold border-2" 
                      : "border-[#dcd3c8] hover:border-[#aaa69e]",
                  ].join(" ")}
                >
                  <span className="text-[11px] leading-none text-[#1a1a1a]">
                    {optionValue.value}
                  </span>

                  <span className="mt-1 text-[9px] leading-none text-[#77716a]">
                    ${optionValue.price}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}