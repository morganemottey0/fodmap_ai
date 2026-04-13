export type FodmapLevel = "low" | "medium" | "high";

export type FodmapType =
  | "fructose"
  | "lactose"
  | "fructans"
  | "GOS"
  | "polyols";

export interface FodmapAnalysis {
  food: string;
  portion: number;
  level: FodmapLevel;
  fodmaps: FodmapType[];
  safe_portion: number;
  tips: string;
}

export interface FoodEntry {
  name: string;
  level: FodmapLevel;
  fodmaps: FodmapType[];
  safe_portion: number;
  tips: string;
}