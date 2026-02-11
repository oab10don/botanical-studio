"use client";

import dynamic from "next/dynamic";

const SplatViewer = dynamic(() => import("./SplatViewer"), { ssr: false });

interface SplatHeroProps {
  url: string;
}

/**
 * SplatViewer 直接表示用のクライアントコンポーネント
 */
export default function SplatHero({ url }: SplatHeroProps) {
  return <SplatViewer url={url} className="h-full w-full" />;
}
