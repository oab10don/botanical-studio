export type ModelFormat = "ply" | "ksplat" | "glb" | "usdz";

export type ModelType = "splat" | "mesh";

export interface PlantModel {
  type: ModelType;
  format: ModelFormat;
  url: string;
  poster: string;
}

export interface Plant {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  tags: string[];
  priceRange: string;
  model: PlantModel;
  featured?: boolean;
}
