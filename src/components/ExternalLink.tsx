"use client";

import { useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * 外部リンク押下時にサンプルサイト免責ポップアップを表示するリンク
 * Portal で body 直下に描画し、親の stacking context に影響されない
 */
export default function ExternalLink({
  href,
  children,
  className,
  ariaLabel,
}: ExternalLinkProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </button>

      {showConfirm &&
        createPortal(
          <div
            className="fixed inset-0 z-[500] flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowConfirm(false);
            }}
          >
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
              <p className="text-sm leading-relaxed text-gray-600">
                これは<span className="font-medium text-[#3d5a35]">サンプルサイト</span>です。
                <br />
                掲載されている店舗情報・商品・価格等は
                <br />
                すべて架空のものであり、実際の情報ではありません。
              </p>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="mt-5 rounded-full bg-[#5a7a50] px-8 py-2.5 text-sm text-white transition-colors hover:bg-[#4a6a40]"
              >
                OK
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
