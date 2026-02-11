import { notFound } from "next/navigation";
import Link from "next/link";
import Hero3D from "@/components/Hero3D";
import { plants, getPlantBySlug } from "@/data/plants";

interface PlantDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }));
}

export async function generateMetadata({ params }: PlantDetailPageProps) {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);
  if (!plant) return { title: "Not Found" };
  return {
    title: `${plant.name} | Botanical Studio`,
    description: plant.description,
  };
}

export default async function PlantDetailPage({ params }: PlantDetailPageProps) {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);
  if (!plant) notFound();

  return (
    <>
      {/* ヒーロー3D */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Hero3D model={plant.model} className="h-full w-full" priority />
      </section>

      {/* 植物情報 */}
      <section className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/plants"
          className="inline-flex items-center gap-1 text-sm text-[#5a7a50] transition-colors hover:text-[#3d5a35]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          一覧に戻る
        </Link>

        <h1 className="mt-6 text-2xl font-light tracking-wider text-[#3d5a35]">
          {plant.name}
        </h1>
        <p className="mt-1 text-sm text-gray-400">{plant.nameEn}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {plant.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#e8f0e4] px-3 py-1 text-xs text-[#5a7a50]"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-gray-600">
          {plant.description}
        </p>

        <p className="mt-6 text-lg text-[#3d5a35]">{plant.priceRange}</p>
      </section>
    </>
  );
}
