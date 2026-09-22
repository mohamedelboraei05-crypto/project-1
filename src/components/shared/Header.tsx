import Link from "next/link";
import { CartNavLink } from "@/features/cart";
import { productPaths } from "@/features/products";

export function Header() {
  return (
    <header className="bg-[#faf8f5]">
      <div className="bg-[#171715] px-4 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[10px]">
        Complimentary signature gift wrapping on all orders
      </div>
      <div className="mx-auto flex min-h-[82px] w-full max-w-[1440px] items-center justify-between border-b border-[#dedbd5] px-5 py-5 sm:px-8 lg:px-20">
        <nav className="flex items-center gap-5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#605a54] sm:gap-8">
          <Link
            href={productPaths.list}
            className="transition-colors hover:text-[#1a1a1a]"
          >
            Home
          </Link>
          <Link
            href={productPaths.list}
            className="transition-colors hover:text-[#1a1a1a]"
          >
            Products
          </Link>
          <span className="hidden sm:inline">Categories</span>
          <span className="hidden sm:inline">The Atelier</span>
        </nav>
        <Link
          href={productPaths.list}
          className="font-[family-name:var(--font-instrument-serif)] text-2xl tracking-[0.2em] text-[#1a1a1a] sm:text-3xl"
        >
          ODORATUS
        </Link>
        <CartNavLink />
      </div>
    </header>
  );
}
