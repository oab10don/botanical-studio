import { Plant } from "@/types/plant";

export const plants: Plant[] = [
  {
    slug: "monstera-deliciosa",
    name: "モンステラ・デリシオーサ",
    nameEn: "Monstera Deliciosa",
    description:
      "大きな切れ込みのある葉が特徴的な人気の観葉植物。丈夫で育てやすく、インテリアのアクセントとして最適です。",
    tags: ["観葉植物", "大型", "初心者向け"],
    priceRange: "¥5,000 - ¥15,000",
    model: {
      type: "splat",
      format: "ply",
      url: "/models/monstera.ply",
      poster: "/posters/placeholder.svg",
    },
    featured: true,
  },
  {
    slug: "ficus-lyrata",
    name: "フィカス・リラータ",
    nameEn: "Fiddle Leaf Fig",
    description:
      "バイオリンの形をした大きな葉が美しい観葉植物。明るい間接光を好みます。",
    tags: ["観葉植物", "大型", "インテリア"],
    priceRange: "¥8,000 - ¥25,000",
    model: {
      type: "mesh",
      format: "glb",
      url: "/models/ficus.glb",
      poster: "/posters/placeholder.svg",
    },
  },
  {
    slug: "pachira-aquatica",
    name: "パキラ",
    nameEn: "Pachira Aquatica",
    description:
      "編み込まれた幹と手のひら型の葉が特徴。金運アップの縁起物としても人気です。",
    tags: ["観葉植物", "中型", "風水"],
    priceRange: "¥3,000 - ¥10,000",
    model: {
      type: "splat",
      format: "ply",
      url: "/models/pachira.ply",
      poster: "/posters/placeholder.svg",
    },
  },
  {
    slug: "strelitzia-reginae",
    name: "ストレリチア・レギネ",
    nameEn: "Bird of Paradise",
    description:
      "極楽鳥花とも呼ばれる、エキゾチックな花を咲かせる植物。葉だけでも存在感抜群。",
    tags: ["観葉植物", "大型", "花"],
    priceRange: "¥6,000 - ¥20,000",
    model: {
      type: "mesh",
      format: "glb",
      url: "/models/strelitzia.glb",
      poster: "/posters/placeholder.svg",
    },
  },
  {
    slug: "sansevieria-trifasciata",
    name: "サンスベリア",
    nameEn: "Snake Plant",
    description:
      "剣のような直立した葉が特徴。空気清浄効果が高く、NASA推奨の観葉植物です。",
    tags: ["観葉植物", "小型", "空気清浄"],
    priceRange: "¥2,000 - ¥8,000",
    model: {
      type: "splat",
      format: "ply",
      url: "/models/sansevieria.ply",
      poster: "/posters/placeholder.svg",
    },
  },
  {
    slug: "euphorbia-obesa",
    name: "ユーフォルビア・オベサ",
    nameEn: "Euphorbia Obesa",
    description:
      "野球ボールのような球形が愛らしい多肉植物。コレクター人気の高い希少種。",
    tags: ["多肉植物", "小型", "希少"],
    priceRange: "¥3,000 - ¥12,000",
    model: {
      type: "splat",
      format: "ply",
      url: "/models/euphorbia.ply",
      poster: "/posters/placeholder.svg",
    },
  },
  {
    slug: "platycerium-bifurcatum",
    name: "ビカクシダ",
    nameEn: "Staghorn Fern",
    description:
      "鹿の角のような葉が特徴的なシダ植物。壁掛けにして楽しむ人が急増中。",
    tags: ["シダ", "中型", "壁掛け"],
    priceRange: "¥4,000 - ¥15,000",
    model: {
      type: "mesh",
      format: "glb",
      url: "/models/platycerium.glb",
      poster: "/posters/placeholder.svg",
    },
  },
  {
    slug: "alocasia-amazonica",
    name: "アロカシア・アマゾニカ",
    nameEn: "Alocasia Amazonica",
    description:
      "深緑に白い葉脈が美しいエキゾチックな植物。矢じり型の葉が印象的。",
    tags: ["観葉植物", "中型", "エキゾチック"],
    priceRange: "¥4,000 - ¥12,000",
    model: {
      type: "splat",
      format: "ply",
      url: "/models/alocasia.ply",
      poster: "/posters/placeholder.svg",
    },
  },
  {
    slug: "tillandsia-xerographica",
    name: "チランジア・キセログラフィカ",
    nameEn: "Tillandsia Xerographica",
    description:
      "銀白色のカールした葉が美しいエアプランツの王様。土不要で吊るして育てられます。",
    tags: ["エアプランツ", "小型", "土不要"],
    priceRange: "¥3,000 - ¥8,000",
    model: {
      type: "mesh",
      format: "glb",
      url: "/models/tillandsia.glb",
      poster: "/posters/placeholder.svg",
    },
  },
  {
    slug: "adansonia-digitata",
    name: "バオバブ",
    nameEn: "Baobab",
    description:
      "アフリカの大地を象徴する神秘的な樹木。盆栽仕立ての幼木は室内でも楽しめます。",
    tags: ["樹木", "中型", "珍しい"],
    priceRange: "¥10,000 - ¥30,000",
    model: {
      type: "splat",
      format: "ply",
      url: "/models/baobab.ply",
      poster: "/posters/placeholder.svg",
    },
  },
];

export function getPlantBySlug(slug: string): Plant | undefined {
  return plants.find((p) => p.slug === slug);
}

export function getFeaturedPlant(): Plant {
  return plants.find((p) => p.featured) ?? plants[0];
}
