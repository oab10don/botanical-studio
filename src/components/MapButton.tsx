"use client";

import ExternalLink from "@/components/ExternalLink";

/**
 * Google Maps外部リンクボタン（免責ポップ付き）
 */
export default function MapButton() {
  return (
    <ExternalLink
      href="#"
      ariaLabel="Google Maps で見る"
      className="inline-flex items-center gap-1 rounded-md bg-[#e8f0e4] px-2 py-0.5 text-[11px] text-[#5a7a50] transition-colors hover:bg-[#d4e4ce]"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
      </svg>
      MAP
    </ExternalLink>
  );
}
