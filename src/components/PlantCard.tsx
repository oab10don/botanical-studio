"use client";

import { PlantCard as PlantCardData } from "@/data/plants";

interface PlantCardProps {
  plant: PlantCardData;
  onSelect: (plant: PlantCardData) => void;
}

/**
 * 植物一覧用のカードコンポーネント
 * クリックで詳細ポップアップを表示
 */
export default function PlantCard({ plant, onSelect }: PlantCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plant)}
      className="w-full overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-shadow hover:shadow-md"
    >
      {/* プレースホルダー画像エリア（植物アイコン） */}
      <div className="relative flex aspect-[4/3] items-center justify-center bg-[#e8f0e4]">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5a7a50"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 20h10" />
          <path d="M12 20v-8" />
          <path d="M12 12C12 8 8 4 4 4c0 4 4 8 8 8z" />
          <path d="M12 12c0-4 4-8 8-8-4 0-8 4-8 8z" />
        </svg>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-[#2d2d2d]">{plant.name}</h3>
        <p className="mt-0.5 text-xs text-gray-400">{plant.tagline}</p>
      </div>
    </button>
  );
}
