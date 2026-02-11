"use client";

import { useState } from "react";
import PlantCard from "@/components/PlantCard";
import PlantDetailModal from "@/components/PlantDetailModal";
import { plantCards, PlantCard as PlantCardData } from "@/data/plants";

/**
 * 植物一覧グリッド + 詳細モーダル
 */
export default function PlantGrid() {
  const [selected, setSelected] = useState<PlantCardData | null>(null);

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {plantCards.map((plant) => (
          <PlantCard key={plant.name} plant={plant} onSelect={setSelected} />
        ))}
      </div>
      <PlantDetailModal plant={selected} onClose={() => setSelected(null)} />
    </>
  );
}
