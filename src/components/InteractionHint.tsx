"use client";

import { useState, useEffect } from "react";

/**
 * 3D操作のヒントを一時表示するコンポーネント
 * 3秒表示後にフェードアウト
 */
export default function InteractionHint() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2500);
    const hideTimer = setTimeout(() => setVisible(false), 3500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-black/50 px-5 py-2.5 text-sm text-white backdrop-blur-sm transition-opacity duration-1000 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M14 8V6a2 2 0 0 0-4 0v2" />
        <path d="M18 12V8a2 2 0 0 0-4 0v4" />
        <path d="M22 12v1a10 10 0 0 1-20 0v-1a2 2 0 0 1 4 0v0a2 2 0 0 0 4 0V6a2 2 0 0 1 4 0v6" />
      </svg>
      <span>ドラッグで回転 / ピンチで拡大</span>
    </div>
  );
}
