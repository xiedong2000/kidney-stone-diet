import type { Food, Level } from "@/lib/model";
import rows from "@/lib/oxalate-source.json";

export type OxalateRow = {
  group: string;
  name: string;
  serving: string;
  category: string;
  mg: number;
};

export const oxalateRows = rows as OxalateRow[];

export const oxalateSource = {
  author: "Pam Hilton",
  title: "Oxalate Content of Foods",
  year: 2020,
  note: "The numbers are milligrams in one listed serving, taken from the June 16, 2020 spreadsheet export.",
};

export function levelFromOxalateMg(mg: number): Level {
  if (mg >= 50) return "high";
  if (mg >= 10) return "moderate";
  return "low";
}

const oxalateLinks: Record<string, string> = {
  water: "Water",
  spinach: "Spinach, cooked",
  kale: "Kale",
  beets: "Beets",
  rhubarb: "Rhubarb",
  "bok-choy": "Bok Choy (Chinese Cabbage)",
  broccoli: "Broccoli",
  cabbage: "Cabbage",
  asparagus: "Asparagus",
  corn: "Corn",
  cauliflower: "Cauliflower",
  cucumber: "Cucumber",
  celery: "Celery, raw",
  zucchini: "Zucchini",
  "bell-pepper": "Green Pepper",
  lettuce: "Romaine Lettuce",
  carrots: "Carrots, raw",
  tomatoes: "Tomato",
  "green-beans": "String Beans",
  "white-potato": "Baked Potato with Skin",
  "sweet-potato": "Sweet Potatoes",
  "potato-chips": "Potato Chips",
  avocado: "Avocados",
  orange: "Orange",
  grapefruit: "Grapefruit",
  "lemon-lime": "Lemons",
  apple: "Apples",
  banana: "Banana",
  cherries: "Cherries",
  grapes: "Grapes",
  pineapple: "Pineapple",
  "dried-figs": "Dried Figs",
  "green-onion": "Scallions",
  "bok-choy-vegetable": "Bok Choy (Chinese Cabbage)",
  blueberries: "Blueberries",
  strawberries: "Strawberries",
  raspberries: "Raspberries",
  kiwi: "Kiwi",
  dates: "Dates",
  olives: "Olives",
  okra: "Okra",
  "navy-beans": "Navy Beans",
  "bamboo-shoots": "Bamboo Shoots",
  milk: "Whole Milk",
  yogurt: "Plain Yogurt",
  "cottage-cheese": "Cottage Cheese",
  "soy-milk": "Soy Milk",
  coffee: "Coffee",
  "black-tea": "Tea, Brewed",
  "instant-tea": "Sweetened Instant Iced Tea",
  "orange-juice": "Orange Juice",
  "carrot-juice": "Carrot Juice",
  "hot-chocolate": "Hot Chocolate (homemade)",
  "cocoa-powder": "Cocoa Powder",
  bread: "White Bread",
  "whole-wheat-bread": "Whole Wheat Bread",
  oatmeal: "Oatmeal Cereal",
  "wheat-bran": "Original Shredded Wheat & Bran",
  "white-rice": "White Rice, cooked",
  "brown-rice": "Brown Rice, cooked",
  pasta: "Spaghetti",
  almonds: "Almonds",
  cashews: "Cashews",
  "peanut-butter": "Peanut Butter",
  walnuts: "Walnuts",
  tofu: "Tofu",
  "miso-soup": "Miso Soup",
  eggs: "Eggs",
  chicken: "Chicken",
  turkey: "Turkey",
  pork: "Pork",
  shrimp: "Shrimp",
  sardines: "Sardines",
  liver: "Liver",
  bacon: "Bacon",
  "black-pepper": "Black Pepper",
  "table-salt": "Salt",
  "soy-sauce": "Soy Sauce",
  beer: "Beer (Regular)",
  "burger-fries": "French Fries (homemade or fast food)",
  pizza: "Pizza with Cheese",
  "street-tacos": "Tacos",
  burrito: "Burritos with beans & meat",
};

export function applyOxalate(food: Food): Food {
  const linkedName = oxalateLinks[food.id];
  if (!linkedName) return food;
  const row = oxalateRows.find((item) => item.name === linkedName);
  if (!row) {
    throw new Error(`No oxalate row named ${linkedName} for ${food.id}`);
  }
  return {
    ...food,
    oxalate: levelFromOxalateMg(row.mg),
    oxalateMg: row.mg,
    oxalateServing: row.serving,
    oxalateSheet: row.category,
  };
}

export function oxalateSentence(food: Food): string | null {
  if (food.oxalateMg == null || !food.oxalateServing) return null;
  const sheet = food.oxalateSheet ? ` The handout calls this serving ${food.oxalateSheet}.` : "";
  const scale =
    food.oxalateMg >= 50
      ? " That amount is high enough to matter when urine oxalate is high."
      : food.oxalateSheet === "Very High" || food.oxalateSheet === "High"
        ? " On this handout, Very High begins near 12 mg. Compare that with cooked spinach at 755 mg per half cup before cutting the food out."
        : "";
  return ` The handout lists ${food.oxalateMg} mg per ${food.oxalateServing}.${sheet}${scale}`;
}
