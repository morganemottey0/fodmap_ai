import { FoodEntry } from "@/types/fodmap";

export const FODMAP_DATABASE: Record<string, FoodEntry> = {
  // Low FODMAP
  carotte: {
    name: "Carotte",
    level: "low",
    fodmaps: [],
    safe_portion: 75,
    tips: "Bien tolérée crue ou cuite, sans restriction particulière.",
  },
  courgette: {
    name: "Courgette",
    level: "low",
    fodmaps: [],
    safe_portion: 65,
    tips: "Excellente option low-FODMAP, polyvalente en cuisine.",
  },
  banane: {
    name: "Banane",
    level: "low",
    fodmaps: [],
    safe_portion: 100,
    tips: "Choisir une banane ferme, pas trop mûre.",
  },
  riz: {
    name: "Riz",
    level: "low",
    fodmaps: [],
    safe_portion: 180,
    tips: "L'une des céréales les plus sûres pour le régime FODMAP.",
  },
  poulet: {
    name: "Poulet",
    level: "low",
    fodmaps: [],
    safe_portion: 150,
    tips: "Toutes les viandes non marinées sont naturellement low-FODMAP.",
  },

  // Medium FODMAP
  avocat: {
    name: "Avocat",
    level: "medium",
    fodmaps: ["polyols"],
    safe_portion: 30,
    tips: "Limiter à 30g (environ 1/8 d'avocat) pour rester dans la zone sûre.",
  },
  brocoli: {
    name: "Brocoli",
    level: "medium",
    fodmaps: ["fructans", "GOS"],
    safe_portion: 75,
    tips: "Les têtes sont mieux tolérées que les tiges. Rester sous 75g.",
  },

  // High FODMAP
  ail: {
    name: "Ail",
    level: "high",
    fodmaps: ["fructans"],
    safe_portion: 0,
    tips: "À éviter complètement. Remplacer par de l'huile d'ail infusée.",
  },
  oignon: {
    name: "Oignon",
    level: "high",
    fodmaps: ["fructans"],
    safe_portion: 0,
    tips: "À éviter. Substituer par la partie verte de la ciboulette ou des oignons verts.",
  },
  pomme: {
    name: "Pomme",
    level: "high",
    fodmaps: ["fructose", "polyols"],
    safe_portion: 0,
    tips: "À éviter. Remplacer par des raisins ou des fraises.",
  },
  lait: {
    name: "Lait de vache",
    level: "high",
    fodmaps: ["lactose"],
    safe_portion: 0,
    tips: "Remplacer par du lait d'avoine, de riz ou d'amande sans lactose.",
  },
};

// Fonction utilitaire pour chercher un aliment dans la base locale
export function findFoodLocally(query: string): FoodEntry | null {
  const normalized = query.toLowerCase().trim();
  return FODMAP_DATABASE[normalized] ?? null;
}