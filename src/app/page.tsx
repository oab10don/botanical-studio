import SplatBackground from "@/components/SplatBackground";
import InteractionHint from "@/components/InteractionHint";
import PlantGrid from "@/components/PlantGrid";
import InstagramButton from "@/components/InstagramButton";
import MapButton from "@/components/MapButton";
import { shopInfo, news } from "@/data/shop";

export default function Home() {
  return (
    <>
      {/* 3Dキャンバス（body直下 position:fixed z-index:1） */}
      <SplatBackground url="/models/plant.spz" />

      {/* 3Dモデル表示エリア - 背景透過でキャンバスが見える */}
      <section className="relative h-[50vh] min-h-[350px]">
        <InteractionHint />
      </section>

      {/* ===== ここから不透明背景 ===== */}

      {/* ヒーローテキスト＋Instagramボタン */}
      <section className="relative z-[100] bg-[#fafcf8] pb-10 pt-10 text-center">
        <h1 className="text-3xl font-light tracking-wider text-[#3d5a35] md:text-4xl">
          {shopInfo.catchcopy}
        </h1>
        <p className="mt-2 text-sm tracking-wide text-[#6b8f5e]">
          {shopInfo.name}
        </p>
        <InstagramButton />
      </section>

      {/* 紹介セクション */}
      <section className="relative z-[100] bg-[#fafcf8] px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-lg font-light tracking-wider text-[#3d5a35]">
            {shopInfo.name}について
          </h2>
          <p className="mt-5 text-sm leading-relaxed whitespace-pre-line text-gray-500">
            {shopInfo.about}
          </p>
          <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-3">
            {["初心者向けの品種も充実", "希少種の取り扱い", "鉢選び相談OK"].map(
              (feature) => (
                <span
                  key={feature}
                  className="rounded-full bg-[#e8f0e4] px-4 py-1.5 text-xs text-[#5a7a50]"
                >
                  {feature}
                </span>
              )
            )}
          </div>
          <p className="mt-6 text-xs text-gray-400">
            営業時間 {shopInfo.hours}｜定休日 {shopInfo.closed}
          </p>
        </div>
      </section>

      {/* 新着情報 */}
      <section className="relative z-[100] bg-[#fafcf8] px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-lg font-light tracking-wider text-[#3d5a35]">
            新着情報
          </h2>
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
            <ul className="divide-y divide-gray-100">
              {news.map((item) => (
                <li
                  key={item.date}
                  className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4"
                >
                  <time className="shrink-0 text-xs text-gray-400">
                    {item.date}
                  </time>
                  <span className="text-sm text-gray-600">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 植物一覧 */}
      <section className="relative z-[100] bg-[#fafcf8] px-6 pt-16 pb-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-lg font-light tracking-wider text-[#3d5a35]">
            植物一覧
          </h2>
          <PlantGrid />
        </div>
      </section>

      {/* 店舗情報 */}
      <section className="relative z-[101] bg-[#fafcf8] px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-lg font-light tracking-wider text-[#3d5a35]">
            店舗情報
          </h2>
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
            <dl className="divide-y divide-gray-100 text-sm">
              <div className="flex flex-col gap-1 py-3 first:pt-0 sm:flex-row sm:gap-0">
                <dt className="w-28 shrink-0 font-medium text-[#3d5a35]">店名</dt>
                <dd className="text-gray-600">{shopInfo.name}</dd>
              </div>
              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-0">
                <dt className="w-28 shrink-0 font-medium text-[#3d5a35]">住所</dt>
                <dd className="flex items-center gap-2 text-gray-600">
                  <span>{shopInfo.address}</span>
                  <MapButton />
                </dd>
              </div>
              {(
                [
                  ["営業時間", shopInfo.hours],
                  ["定休日", shopInfo.closed],
                  ["電話", shopInfo.phone],
                  ["アクセス", shopInfo.access],
                  ["お支払い", shopInfo.payment],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 py-3 last:pb-0 sm:flex-row sm:gap-0"
                >
                  <dt className="w-28 shrink-0 font-medium text-[#3d5a35]">
                    {label}
                  </dt>
                  <dd className="text-gray-600">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* コピーライトフッター */}
      <footer className="relative z-[100] bg-[#3d5a35] py-8 text-center text-xs text-white/60">
        &copy; 2026 {shopInfo.name}. All rights reserved.
      </footer>
    </>
  );
}
