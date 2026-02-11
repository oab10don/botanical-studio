import { Plant } from "@/types/plant";

/** カード表示用の植物データ */
export interface PlantCard {
  name: string;
  tagline: string;
  description: string;
  modelUrl: string;
}

export const plantCards: PlantCard[] = [
  {
    name: "エバーフレッシュ S",
    tagline: "小さくても存在感あり",
    description:
      "コンパクトなSサイズのエバーフレッシュ。デスクや棚の上にちょうど良いサイズ感で、繊細な葉が揺れる姿に癒されます。夜になると葉を閉じる「就眠運動」も楽しめます。",
    modelUrl: "/models/plant.spz",
  },
  {
    name: "エバーフレッシュ M",
    tagline: "リビングに映える人気サイズ",
    description:
      "もっとも人気のあるMサイズ。リビングや寝室の窓際に置くと、光を透かした葉がとても美しく映えます。成長が早いので、育てる楽しさも実感しやすいサイズです。",
    modelUrl: "/models/plant.spz",
  },
  {
    name: "エバーフレッシュ L",
    tagline: "空間の主役になる一本",
    description:
      "存在感のあるLサイズ。広めのリビングやオフィスのエントランスにおすすめです。風に揺れる繊細な葉と、しっかりとした幹のコントラストが魅力的です。",
    modelUrl: "/models/plant.spz",
  },
  {
    name: "エバーフレッシュ 曲がり仕立て",
    tagline: "個性的なシルエット",
    description:
      "幹を曲げて仕立てた一点もの。自然な曲線が空間にやわらかな表情を加えます。同じ形は二つとないので、お気に入りの一本を見つける楽しみがあります。",
    modelUrl: "/models/plant.spz",
  },
  {
    name: "エバーフレッシュ 朴仕立て",
    tagline: "ワイルドな幹が魅力",
    description:
      "太い朴（ぼく）から新芽を吹かせた力強い仕立て。和モダンやナチュラルテイストのインテリアと相性抜群。丈夫で管理しやすく、長く楽しめます。",
    modelUrl: "/models/plant.spz",
  },
  {
    name: "エバーフレッシュ テラコッタ鉢セット",
    tagline: "届いてすぐ飾れる",
    description:
      "素焼きのテラコッタ鉢とセットでお届け。鉢選びの手間なく、届いたその日からインテリアに馴染みます。受け皿付きで床も安心です。",
    modelUrl: "/models/plant.spz",
  },
  {
    name: "エバーフレッシュ セメント鉢セット",
    tagline: "モダンな鉢との組み合わせ",
    description:
      "無機質なセメント鉢がエバーフレッシュの繊細な葉を引き立てます。モダンインテリアやモノトーンの空間によく合うスタイリッシュな組み合わせです。",
    modelUrl: "/models/plant.spz",
  },
  {
    name: "エバーフレッシュ ギフトセット",
    tagline: "贈り物に最適",
    description:
      "ラッピング・メッセージカード付きのギフトセット。引越し祝いや開店祝いに人気です。育て方ガイドも同封するので、植物初心者の方への贈り物にも安心です。",
    modelUrl: "/models/plant.spz",
  },
];

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
      format: "ksplat",
      url: "/models/monstera.ksplat",
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
