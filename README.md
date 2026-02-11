# Botanical Studio

植物の美しさを3Dで体験できるデモサイト。Gaussian Splatting（PLY）とメッシュモデル（GLB）の両方に対応。

## 技術スタック

- **Next.js** (App Router) + TypeScript
- **@mkkellogg/gaussian-splats-3d** - Gaussian Splat表示（PLY/KSPLAT）
- **@google/model-viewer** - メッシュ表示（GLB/USDZ）
- **three.js** - 3Dエンジン
- **Tailwind CSS v4**

## セットアップ

```bash
npm install
npm run dev
```

http://localhost:3000 でアクセス。

## 3Dモデルの配置

### Gaussian Splat (PLY)

1. PLYファイルを `public/models/` に配置
2. `src/data/plants.ts` でモデルURLを設定

```ts
model: {
  type: "splat",
  format: "ply",
  url: "/models/your-plant.ply",
  poster: "/posters/your-plant.jpg",
}
```

### メッシュモデル (GLB)

1. GLBファイルを `public/models/` に配置
2. `src/data/plants.ts` でモデルURLを設定

```ts
model: {
  type: "mesh",
  format: "glb",
  url: "/models/your-plant.glb",
  poster: "/posters/your-plant.jpg",
}
```

### ポスター画像

3Dモデルのロード中に表示される画像。`public/posters/` に配置。

- 推奨サイズ: 1200x800px
- 形式: JPEG / WebP / SVG

## SPZ → PLY 変換

`@mkkellogg/gaussian-splats-3d` はSPZ非対応のため、PLYに変換してください。

### SuperSplat で変換

1. [SuperSplat](https://playcanvas.com/supersplat/editor) にアクセス
2. SPZファイルをドラッグ&ドロップ
3. File → Export → PLY でエクスポート

### コマンドライン

```bash
# gsplat-tools を使う場合
pip install gsplat-tools
gsplat convert input.spz -o output.ply
```

## データの差し替え

`src/data/plants.ts` を編集して植物データを変更できます。

```ts
{
  slug: "your-plant",        // URLスラッグ（英数字・ハイフン）
  name: "植物名",
  nameEn: "English Name",
  description: "説明文",
  tags: ["タグ1", "タグ2"],
  priceRange: "¥X,000 - ¥XX,000",
  model: { ... },
  featured: true,            // トップページのヒーロー表示
}
```

## ページ構成

| パス | 内容 |
|------|------|
| `/` | トップページ（featured植物の3Dヒーロー） |
| `/plants` | 植物一覧 |
| `/plants/[slug]` | 植物詳細（3Dヒーロー） |

## UX機能

- **ポスターファースト**: 3Dロード中はポスター画像を即座に表示
- **フェードトランジション**: 3Dロード完了後にポスター→3Dにフェード切替
- **タイムアウト**: 8秒以内に3Dがロードできない場合はポスターに留まる
- **操作ヒント**: 初回表示時に「ドラッグで回転 / ピンチで拡大」を3秒表示
- **prefers-reduced-motion**: 自動回転OFF、ポスター固定モード
- **Save-Data**: 3Dロードをスキップしポスターのみ表示

## 推奨エクスポート設定

### Gaussian Splat (Luma AI等)

- フォーマット: PLY
- 解像度: Medium〜High（ファイルサイズ50MB以下推奨）

### メッシュ (Blender等)

- フォーマット: GLB (glTF Binary)
- テクスチャ: 2K以下推奨
- ポリゴン数: 100K以下推奨

## デプロイ

```bash
npm run build  # ビルド確認
```

Vercelへのデプロイ推奨。設定不要でそのまま動作します。
