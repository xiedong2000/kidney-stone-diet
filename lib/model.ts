export const levels = ["low", "moderate", "high"] as const;
export type Level = (typeof levels)[number];
export type OxalateLevel = Level | "not-listed";

export const foodGroups = [
  { id: "asked", label: "Often asked" },
  { id: "all", label: "All foods" },
  { id: "meals", label: "Dishes" },
  { id: "drinks", label: "Drinks" },
  { id: "fruit", label: "Fruit" },
  { id: "vegetables", label: "Vegetables" },
  { id: "grains", label: "Grains" },
  { id: "protein", label: "Protein" },
  { id: "dairy", label: "Dairy" },
  { id: "nuts", label: "Nuts and seeds" },
  { id: "sweets", label: "Sweets" },
  { id: "seasoning", label: "Salty foods" },
] as const;

export type FoodGroup = (typeof foodGroups)[number]["id"];

export const cuisines = [
  { id: "all", label: "Every cuisine" },
  { id: "chinese", label: "Chinese" },
  { id: "american", label: "American" },
  { id: "mexican", label: "Mexican" },
  { id: "japanese", label: "Japanese" },
  { id: "indian", label: "Indian" },
  { id: "italian", label: "Italian" },
  { id: "everyday", label: "Ingredients" },
] as const;

export type Cuisine = (typeof cuisines)[number]["id"];

export const foodTags = [
  "fluid",
  "dietary-calcium",
  "citrate",
  "juice",
  "animal",
  "organ",
  "plant",
  "alcohol",
  "weak-fluid",
  "medicine",
  "potassium-load",
] as const;

export type FoodTag = (typeof foodTags)[number];

export type FoodImageCredit = {
  creator: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

export type Food = {
  id: string;
  name: string;
  aliases: string[];
  group: Exclude<FoodGroup, "asked" | "all">;
  cuisine: Exclude<Cuisine, "all">;
  oxalate: OxalateLevel;
  sodium: Level;
  purine: Level;
  addedSugar: Level;
  tags: FoodTag[];
  tip: string;
  originalName?: string;
  image?: string;
  imageCredit?: FoodImageCredit;
  chineseMenuGroup?: "takeout" | "home-style";
  avoidReason?: string;
  oxalateMg?: number;
  oxalateServing?: string;
  oxalateSheet?: string;
};

export const stoneFocuses = [
  {
    id: "unsure",
    label: "Not sure yet",
    summary:
      "Follow the habits that help almost every stone former. Do not ban long lists of healthy foods before a stone analysis or a urine test.",
  },
  {
    id: "calcium-oxalate",
    label: "Calcium oxalate",
    summary:
      "The usual stone. Drink enough, cut salt, keep calcium from food with meals, and keep the very high-oxalate foods small.",
  },
  {
    id: "calcium-phosphate",
    label: "Calcium phosphate",
    summary:
      "Fluid, less salt, and modest meat still matter. Large juice routines and alkali supplements can work against this stone. Ask first.",
  },
  {
    id: "uric-acid",
    label: "Uric acid",
    summary:
      "Cut the highest-purine meats and seafoods, drop sugar-sweetened drinks, and ask about alkali. Oxalate is not the main lever.",
  },
  {
    id: "cystine",
    label: "Cystine",
    summary:
      "Fluid is the treatment you do yourself, often enough to make more than 3 liters of urine. Less salt and modest animal protein help. Medicine is common.",
  },
  {
    id: "struvite",
    label: "Struvite",
    summary:
      "These stones come from infection. Food lists do not clear them. The medical plan is infection care and, usually, removing the stone.",
  },
] as const;

export type StoneFocusId = (typeof stoneFocuses)[number]["id"];

export const verdicts = {
  fits: {
    label: "Usually fine",
    detail: "A normal portion fits this pattern.",
  },
  careful: {
    label: "Mind the portion",
    detail: "It can fit, with a limit or a condition.",
  },
  limit: {
    label: "Keep it rare",
    detail: "Most plans do better when this is uncommon.",
  },
} as const;

export type Verdict = keyof typeof verdicts;

export type Guidance = {
  verdict: Verdict;
  reason: string;
};
