import Link from "next/link";
import SplatHero from "@/components/SplatHero";

export default function Home() {
  return (
    <>
      {/* ヒーローセクション - SplatViewer直接配置で動作確認 */}
      <section className="relative h-[70vh] min-h-[500px]">
        <SplatHero url="/models/monstera.ksplat" />

        {/* オーバーレイテキスト */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end pb-16">
          <h1 className="text-center text-3xl font-light tracking-wider text-[#3d5a35] md:text-4xl">
            植物と暮らす
          </h1>
          <p className="mt-2 text-center text-sm tracking-wide text-[#6b8f5e]">
            3Dで感じる、新しい植物体験
          </p>
          <Link
            href="/plants"
            className="pointer-events-auto mt-6 rounded-full bg-[#5a7a50] px-8 py-3 text-sm text-white transition-colors hover:bg-[#4a6a40]"
          >
            コレクションを見る
          </Link>
        </div>
      </section>

      {/* 紹介セクション */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-xl font-light tracking-wider text-[#3d5a35]">
          Welcome to Botanical Studio
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-500">
          Botanical
          Studioは、植物の美しさを3Dで体験できるオンラインショップです。
          Gaussian Splatting技術により、まるで目の前に植物があるかのような
          リアルな質感をお楽しみいただけます。
        </p>
      </section>
    </>
  );
}
