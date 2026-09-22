"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";

type AddToCartButtonProps = AddToCartInput & {
  quantity?: number;
};

export function AddToCartButton(props: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { quantity = 1, ...item } = props;

  return (
    <Button
      className="h-12 w-full rounded-none bg-[#1a1a1a] text-[10px] uppercase tracking-[0.15em] hover:bg-[#393733]"
      onClick={() => {
        for (let index = 0; index < quantity; index += 1) {
          addItem(item);
        }
      }}
    >
      Add to cart
    </Button>
  );
}
