import Link from "next/link";
import Image from "next/image";
import { Plant } from "@/types/plant";

interface PlantCardProps {
  plant: Plant;
}

/**
 * 植物一覧用のカードコンポーネント
 */
export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <Link
      href={`/plants/${plant.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-[#f5f7f3]">
        <Image
          src={plant.model.poster}
          alt={plant.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-[#2d2d2d]">{plant.name}</h3>
        <p className="mt-0.5 text-xs text-gray-400">{plant.nameEn}</p>
        <p className="mt-2 text-sm text-[#5a7a50]">{plant.priceRange}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {plant.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#e8f0e4] px-2 py-0.5 text-[10px] text-[#5a7a50]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
