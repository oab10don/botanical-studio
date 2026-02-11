/** 店舗基本情報 */
export const shopInfo = {
  name: "Botanical Studio",
  catchcopy: "暮らしに、緑の余白を。",
  instagramUrl: "https://www.instagram.com/botanical_studio.jp/",
  address: "〒892-0000 鹿児島県鹿児島市○○町1-2-3",
  hours: "11:00〜19:00",
  closed: "水曜（＋不定休あり）",
  phone: "099-000-0000",
  access: "市電「○○駅」徒歩5分／近隣にコインPあり",
  payment: "現金・クレジット・QR決済",
  about:
    "Botanical Studioは、観葉植物と鉢を中心に取り扱うショップです。\nはじめての方でも育てやすい品種から、空間の主役になる一点ものまでご提案します。\nお部屋の明るさやライフスタイルに合わせて、育て方も一緒にご案内します。",
} as const;

/** 新着情報 */
export interface NewsItem {
  date: string;
  text: string;
}

export const news: NewsItem[] = [
  {
    date: "2026.02.10",
    text: "週末限定で「植え替え相談会」を開催します",
  },
  {
    date: "2026.02.03",
    text: "春に向けた新入荷がまとまりました（小型観葉多め）",
  },
  {
    date: "2026.01.27",
    text: "ギフト用ラッピングの受付を開始しました",
  },
];
