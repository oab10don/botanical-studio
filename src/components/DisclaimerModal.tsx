"use client";

import { useState } from "react";

/**
 * サンプルサイト免責ポップアップ
 * 毎回リロード時に表示し、OKを押すまでコンテンツを操作できない
 */
export default function DisclaimerModal() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
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
          onClick={() => setOpen(false)}
          className="mt-5 rounded-full bg-[#5a7a50] px-8 py-2.5 text-sm text-white transition-colors hover:bg-[#4a6a40]"
        >
          OK
        </button>
      </div>
    </div>
  );
}
