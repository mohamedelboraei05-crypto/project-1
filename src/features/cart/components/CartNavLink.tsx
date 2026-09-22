"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/hooks/useCart";
import { cartPaths } from "@/features/cart/paths";

export function CartNavLink() {
  const { quantity } = useCart();

  return (
    <Link
      href={cartPaths.cart}
      className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#605a54] transition-colors hover:text-[#1a1a1a]"
    >
      Cart {quantity > 0 ? `(${quantity})` : ""}
    </Link>
  );
}
