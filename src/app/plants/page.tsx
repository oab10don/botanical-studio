import PlantCard from "@/components/PlantCard";
import { plants } from "@/data/plants";

export const metadata = {
  title: "Plants | Botanical Studio",
  description: "3Dで見る植物コレクション",
};

export default function PlantsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-24 pb-16">
      <h1 className="text-center text-2xl font-light tracking-wider text-[#3d5a35]">
        Collection
      </h1>
      <p className="mt-2 text-center text-sm text-gray-400">
        植物を選んで、3Dで体験してみましょう
      </p>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
        {plants.map((plant) => (
          <PlantCard key={plant.slug} plant={plant} />
        ))}
      </div>
    </div>
  );
}
