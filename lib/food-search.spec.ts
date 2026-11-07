import assert from "node:assert/strict";
import { test } from "node:test";
import {
  foodSearchScore,
  foodSearchScoreForTerms,
  splitFoodSearchTerms,
  unmatchedFoodSearchTerms,
} from "./food-search";
import { foods } from "./foods";
import {
  chineseFoodName,
  chineseFoodTip,
  containsChineseText,
  foodDisplayNames,
  foodSummary,
} from "./chinese-localization";

function findFood(id: string) {
  const food = foods.find((item) => item.id === id);
  assert.ok(food, `missing food ${id}`);
  return food;
}

test("food search accepts partial words and common misspellings", () => {
  assert.notEqual(foodSearchScore(findFood("strawberries"), "straw"), null);
  assert.notEqual(foodSearchScore(findFood("strawberries"), "strawberri"), null);
  assert.notEqual(foodSearchScore(findFood("spinach"), "spinich"), null);
  assert.notEqual(foodSearchScore(findFood("ramen"), "ramen soup"), null);
});

test("food search rejects unrelated text and ranks closer matches first", () => {
  const spinach = findFood("spinach");
  const strawberries = findFood("strawberries");
  const saagPaneer = findFood("saag-paneer");
  const beer = findFood("beer");
  const beetGreens = findFood("beet-greens");

  assert.equal(foodSearchScore(spinach, "blueberry"), null);
  assert.equal(foodSearchScore(beer, "beef"), null);
  assert.equal(foodSearchScore(beetGreens, "beef"), null);
  assert.ok(
    (foodSearchScore(spinach, "spinich") ?? 0) >
      (foodSearchScore(saagPaneer, "spinich") ?? 0),
  );
  assert.ok(
    (foodSearchScore(spinach, "spinach") ?? 0) >
      (foodSearchScore(spinach, "spinich") ?? 0),
  );
  assert.ok(
    (foodSearchScore(strawberries, "strawberries") ?? 0) >
      (foodSearchScore(strawberries, "strawberri") ?? 0),
  );
});

test("Chinese names and pinyin find common foods", () => {
  assert.notEqual(foodSearchScore(findFood("white-rice"), "米饭"), null);
  assert.notEqual(foodSearchScore(findFood("beef"), "niurou"), null);
  assert.notEqual(foodSearchScore(findFood("bok-choy-vegetable"), "小白菜"), null);
  assert.notEqual(foodSearchScore(findFood("napa-cabbage"), "napa"), null);
  assert.notEqual(foodSearchScore(findFood("beef-noodle-soup"), "牛肉面"), null);
  assert.notEqual(foodSearchScore(findFood("steamed-egg"), "zhengdan"), null);
  assert.notEqual(foodSearchScore(findFood("celery"), "芹菜"), null);
  assert.notEqual(foodSearchScore(findFood("celery"), "qincai"), null);
  assert.notEqual(foodSearchScore(findFood("grapes"), "葡萄"), null);
  assert.notEqual(foodSearchScore(findFood("sweet-potato"), "红薯"), null);
  assert.notEqual(foodSearchScore(findFood("sweet-potato"), "紅薯"), null);
  assert.notEqual(foodSearchScore(findFood("sweet-potato"), "地瓜"), null);
  assert.notEqual(foodSearchScore(findFood("corn"), "玉米"), null);
  assert.notEqual(foodSearchScore(findFood("corn"), "yumi"), null);
  assert.notEqual(foodSearchScore(findFood("corn-tortilla"), "玉米饼"), null);
  assert.equal(findFood("corn").oxalateMg, 1);
  assert.equal(findFood("corn").oxalateServing, "1/2 cup");
  assert.ok(
    (foodSearchScore(findFood("corn"), "corn") ?? 0) >
      (foodSearchScore(findFood("corn-tortilla"), "corn") ?? 0),
  );
  assert.equal(findFood("celery").oxalateMg, 3);
  assert.equal(findFood("celery").oxalateServing, "1 stalk");
});

test("Chinese queries return Chinese food names and serving guidance", () => {
  assert.equal(containsChineseText("葡萄"), true);
  assert.equal(containsChineseText("grapes"), false);
  assert.equal(chineseFoodName(findFood("grapes")), "葡萄");
  assert.deepEqual(foodDisplayNames(findFood("grapes"), true), {
    primary: "葡萄",
    secondary: "Grapes",
  });
  assert.match(chineseFoodTip(findFood("grapes")), /葡萄干/);
  assert.equal(chineseFoodName(findFood("beef-noodle-soup")), "牛肉面");
  assert.deepEqual(foodDisplayNames(findFood("beef-noodle-soup"), true), {
    primary: "牛肉面",
    secondary: "Beef noodle soup",
  });
  assert.doesNotMatch(foodSummary(findFood("instant-tea"), false), /\d+\s*mg/i);
  assert.doesNotMatch(foodSummary(findFood("corn"), false), /\d+\s*mg/i);
});

test("pepper varieties are searchable without borrowing bell-pepper oxalate data", () => {
  assert.notEqual(foodSearchScore(findFood("shishito-peppers"), "shishito"), null);
  assert.notEqual(foodSearchScore(findFood("shishito-peppers"), "獅子唐"), null);
  assert.notEqual(foodSearchScore(findFood("shishito-peppers"), "Shishito Heirloom Japanese Sweet Pepper"), null);
  assert.notEqual(foodSearchScore(findFood("japanese-sweet-pepper"), "heirloom Japanese sweet pepper"), null);
  assert.equal(findFood("shishito-peppers").oxalate, "not-listed");
  assert.equal(findFood("shishito-peppers").oxalateMg, undefined);
  assert.equal(findFood("japanese-sweet-pepper").oxalate, "not-listed");
  assert.equal(findFood("japanese-sweet-pepper").oxalateMg, undefined);
});

test("daikon is searchable by Chinese name and keeps its oxalate data explicit", () => {
  assert.notEqual(foodSearchScore(findFood("daikon"), "白萝卜"), null);
  assert.notEqual(foodSearchScore(findFood("daikon"), "白蘿蔔"), null);
  assert.notEqual(foodSearchScore(findFood("daikon"), "bailuobo"), null);
  assert.equal(findFood("daikon").oxalate, "not-listed");
  assert.equal(findFood("daikon").oxalateMg, undefined);
});

test("lamb is searchable by English and Chinese names", () => {
  assert.notEqual(foodSearchScore(findFood("lamb"), "lamb"), null);
  assert.notEqual(foodSearchScore(findFood("lamb"), "mutton"), null);
  assert.notEqual(foodSearchScore(findFood("lamb"), "羊肉"), null);
  assert.notEqual(foodSearchScore(findFood("lamb"), "yangrou"), null);
});

test("ingredient lists match known components and report unknown ones", () => {
  const terms = splitFoodSearchTerms("beef，bok choy, watercress");
  assert.deepEqual(terms, ["beef", "bok choy", "watercress"]);
  assert.notEqual(foodSearchScoreForTerms(findFood("beef"), terms), null);
  assert.notEqual(foodSearchScoreForTerms(findFood("bok-choy-vegetable"), terms), null);
  assert.deepEqual(unmatchedFoodSearchTerms("beef, watercress", foods), ["watercress"]);
});
