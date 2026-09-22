import Link from "next/link";
import { productPaths } from "@/features/products";

export function Footer() {
  return (
    <footer className="bg-[#171715] px-8 py-12 text-[#f8f5ef] sm:px-12 lg:px-20">
      <div className="mx-auto grid max-w-[1360px] gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link
            href={productPaths.list}
            className="font-[family-name:var(--font-instrument-serif)] text-2xl tracking-[0.2em]"
          >
            ODORATUS
          </Link>
          <p className="mt-5 max-w-xs text-[10px] leading-5 text-[#aaa69e]">
            An independent olfactory house cultivating slow luxury liquid
            narratives. Every bottle is hand-poured in small batches using
            sustainably sourced botanicals.
          </p>
          <div className="mt-5 flex gap-3 text-[10px] text-[#aaa69e]">
            <span>◎</span>
            <span>◌</span>
            <span>●</span>
          </div>
        </div>
        {[
          [
            "Collections",
            "La Maison",
            "Private Reserve",
            "Scented Candles",
            "Discovery Sets",
          ],
          [
            "Customer Care",
            "Shipping & Returns",
            "Order a Sample",
            "Care Guide",
          ],
          [
            "About Us",
            "Our Philosophy",
            "Sourcing Standards",
            "Sustainability Commitment",
            "Journal",
          ],
        ].map(([title, ...links]) => (
          <div key={title}>
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#c5a880]">
              {title}
            </p>
            <div className="mt-4 space-y-3 text-[10px] text-[#aaa69e]">
              {links.map((link) => (
                <p key={link}>{link}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-[1360px] justify-between border-t border-[#363532] pt-4 text-[9px] text-[#716e68]">
        <span>© 2025 ODORATUS. ALL RIGHTS RESERVED.</span>
        <span>PRIVACY POLICY · TERMS · CONTACT</span>
      </div>
    </footer>
  );
}
