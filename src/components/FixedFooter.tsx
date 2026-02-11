"use client";

import { shopInfo } from "@/data/shop";
import ExternalLink from "@/components/ExternalLink";

/**
 * 画面下部に固定表示されるフッター
 * Instagram / Google Maps / メール の3アイコン
 */
export default function FixedFooter() {
  return (
    <nav className="fixed bottom-0 left-0 z-[200] flex w-full items-center justify-center gap-8 border-t border-gray-200 bg-white/90 py-3 backdrop-blur-sm">
      {/* Instagram */}
      <ExternalLink
        href={shopInfo.instagramUrl}
        ariaLabel="Instagram"
        className="text-[#3d5a35] transition-colors hover:text-[#5a7a50]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      </ExternalLink>

      {/* Google Maps */}
      <ExternalLink
        href="#"
        ariaLabel="Google Maps"
        className="text-[#3d5a35] transition-colors hover:text-[#5a7a50]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
        </svg>
      </ExternalLink>

      {/* メール */}
      <ExternalLink
        href="mailto:info@botanical-studio.example"
        ariaLabel="メール"
        className="text-[#3d5a35] transition-colors hover:text-[#5a7a50]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 4L12 13 2 4" />
        </svg>
      </ExternalLink>
    </nav>
  );
}
