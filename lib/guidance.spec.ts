import assert from "node:assert/strict";
import { test } from "node:test";
import { dishes } from "./dishes";
import { featuredFoodIds, foods } from "./foods";
import { guidanceFor } from "./guidance";
import { stoneFocuses, type StoneFocusId, type Verdict } from "./model";

function verdict(id: string, focus: StoneFocusId): Verdict {
  const food = foods.find((item) => item.id === id);
  assert.ok(food, `missing food ${id}`);
  return guidanceFor(food, focus).verdict;
}

test("calcium oxalate limits the very high-oxalate foods", () => {
  for (const id of ["spinach", "rhubarb", "swiss-chard", "almonds", "wheat-bran", "white-potato", "okra", "navy-beans"]) {
    assert.equal(verdict(id, "calcium-oxalate"), "limit", id);
  }
  assert.equal(verdict("kale", "calcium-oxalate"), "fits");
  assert.equal(verdict("milk", "calcium-oxalate"), "fits");
  assert.equal(verdict("yogurt", "calcium-oxalate"), "fits");
  assert.equal(verdict("black-tea", "calcium-oxalate"), "careful");
});

test("unknown stone type does not ban spinach outright", () => {
  assert.equal(verdict("spinach", "unsure"), "careful");
  assert.equal(verdict("water", "unsure"), "fits");
  assert.equal(verdict("cola", "unsure"), "limit");
});

test("unlisted pepper varieties disclose missing oxalate data", () => {
  assert.equal(verdict("shishito-peppers", "calcium-oxalate"), "careful");
  assert.equal(verdict("japanese-sweet-pepper", "unsure"), "careful");
  assert.equal(verdict("daikon", "calcium-oxalate"), "careful");
  assert.equal(verdict("gai-lan", "calcium-oxalate"), "careful");
  assert.equal(verdict("shishito-peppers", "uric-acid"), "fits");
  const shishito = foods.find((item) => item.id === "shishito-peppers");
  assert.ok(shishito);
  assert.match(guidanceFor(shishito, "calcium-oxalate").reason, /does not list this variety/i);
  const daikon = foods.find((item) => item.id === "daikon");
  assert.ok(daikon);
  assert.match(guidanceFor(daikon, "calcium-oxalate").reason, /does not list this variety/i);
});

test("produce photos include source and license attribution", () => {
  for (const id of ["daikon", "shishito-peppers", "gai-lan"]) {
    const item = foods.find((food) => food.id === id);
    assert.ok(item, `missing food ${id}`);
    assert.ok(item.image, `${id} needs a photo`);
    assert.ok(item.imageCredit, `${id} needs photo attribution`);
    assert.match(item.imageCredit.sourceUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.match(item.imageCredit.licenseUrl, /^https:\/\/creativecommons\.org\//);
  }
});

test("uric acid targets purines and sugar, not oxalate", () => {
  assert.equal(verdict("sardines", "uric-acid"), "limit");
  assert.equal(verdict("liver", "uric-acid"), "limit");
  assert.equal(verdict("spinach", "uric-acid"), "fits");
  assert.equal(verdict("lentils", "uric-acid"), "fits");
  assert.equal(verdict("eggs", "uric-acid"), "fits");
  assert.equal(verdict("chicken", "uric-acid"), "careful");
  assert.equal(verdict("lamb", "uric-acid"), "careful");
  assert.equal(verdict("lemon-juice", "uric-acid"), "fits");
});

test("calcium phosphate is cautious about juice", () => {
  assert.equal(verdict("lemon-juice", "calcium-phosphate"), "careful");
  assert.equal(verdict("orange", "calcium-phosphate"), "fits");
  assert.equal(verdict("spinach", "calcium-phosphate"), "careful");
});

test("cystine emphasizes salt and animal protein", () => {
  assert.equal(verdict("table-salt", "cystine"), "limit");
  assert.equal(verdict("eggs", "cystine"), "careful");
  assert.equal(verdict("spinach", "cystine"), "fits");
});

test("struvite does not pretend diet treats the stone", () => {
  assert.equal(verdict("spinach", "struvite"), "fits");
  assert.equal(verdict("almonds", "struvite"), "fits");
  assert.equal(verdict("cola", "struvite"), "careful");
  assert.equal(verdict("water", "struvite"), "fits");
});

test("every food can be labeled for every stone", () => {
  const ids = new Set<string>();
  for (const food of foods) {
    assert.equal(ids.has(food.id), false, `duplicate ${food.id}`);
    ids.add(food.id);
    for (const focus of stoneFocuses) {
      const result = guidanceFor(food, focus.id);
      assert.ok(result.reason.length > 40, `${food.id} ${focus.id}`);
    }
  }
  for (const id of featuredFoodIds) {
    assert.equal(ids.has(id), true, id);
  }
});

test("cuisine dishes follow salt, oxalate, and purine", () => {
  assert.equal(verdict("congee", "unsure"), "fits");
  assert.equal(verdict("bok-choy", "calcium-oxalate"), "fits");
  assert.equal(verdict("fried-rice", "calcium-oxalate"), "limit");
  assert.equal(verdict("nopales", "calcium-oxalate"), "limit");
  assert.equal(verdict("nopales", "uric-acid"), "fits");
  assert.equal(verdict("saag-paneer", "calcium-oxalate"), "limit");
  assert.equal(verdict("dal", "uric-acid"), "fits");
  assert.equal(verdict("milk-tea", "unsure"), "limit");
  assert.equal(verdict("ramen", "cystine"), "limit");
  assert.equal(verdict("steamed-fish", "calcium-oxalate"), "careful");
  assert.equal(verdict("menudo", "uric-acid"), "limit");
  assert.equal(verdict("fajitas", "calcium-oxalate"), "careful");
  assert.equal(verdict("orange", "calcium-oxalate"), "careful");
  assert.equal(verdict("strawberries", "calcium-oxalate"), "fits");
  assert.equal(verdict("oatmeal", "calcium-oxalate"), "fits");
  assert.equal(verdict("instant-tea", "calcium-oxalate"), "limit");
  const instantTea = foods.find((item) => item.id === "instant-tea");
  assert.equal(instantTea?.oxalateMg, 0);
  assert.equal(instantTea?.oxalate, "low");
  assert.equal(verdict("miso-soup", "calcium-oxalate"), "limit");
  const spinach = foods.find((item) => item.id === "spinach");
  assert.equal(spinach?.oxalateMg, 755);
  assert.match(guidanceFor(spinach!, "calcium-oxalate").reason, /755 mg/);
  const orange = foods.find((item) => item.id === "orange");
  assert.match(guidanceFor(orange!, "calcium-oxalate").reason, /29 mg/);
  assert.notEqual(verdict("cashews", "calcium-oxalate"), "limit");
});

test("shorter takeout cuisine lists have practical examples", () => {
  const chineseDishes = dishes.filter((dish) => dish.cuisine === "chinese");
  assert.ok(
    chineseDishes.length >= 33,
    `Chinese list has ${chineseDishes.length} dishes; expected at least 33`,
  );
  for (const dish of chineseDishes) {
    assert.match(dish.originalName ?? "", /\p{Script=Han}/u, `${dish.id} needs a Chinese name`);
    assert.ok(dish.tip.length > 40, `${dish.id} needs a useful ordering tip`);
    assert.ok(dish.chineseMenuGroup, `${dish.id} needs a Chinese menu group`);
  }
  for (const id of [
    "fried-rice",
    "milk-tea",
    "kung-pao",
    "char-siu-bao",
    "egg-drop-soup",
    "beef-broccoli",
    "lo-mein",
    "spring-rolls",
    "orange-chicken",
  ]) {
    assert.equal(
      chineseDishes.find((dish) => dish.id === id)?.chineseMenuGroup,
      "takeout",
      `${id} should be in the takeout group`,
    );
  }
  for (const id of [
    "hong-shao-rou",
    "yu-xiang-rou-si",
    "hui-guo-rou",
    "hot-and-sour-soup",
    "di-san-xian",
    "shou-si-bao-cai",
    "tang-cu-li-ji",
  ]) {
    assert.ok(chineseDishes.some((dish) => dish.id === id), `missing Chinese dish ${id}`);
  }

  const minimums = {
    american: 7,
    indian: 6,
    italian: 6,
    japanese: 7,
  } as const;

  for (const [cuisine, minimum] of Object.entries(minimums)) {
    const cuisineDishes = dishes.filter((dish) => dish.cuisine === cuisine);
    assert.ok(
      cuisineDishes.length >= minimum,
      `${cuisine} has ${cuisineDishes.length} dishes; expected at least ${minimum}`,
    );
    for (const dish of cuisineDishes) {
      assert.ok(dish.tip.length > 40, `${dish.id} needs a useful ordering tip`);
    }
  }
});

test("openly licensed dish photos include creator and license attribution", () => {
  for (const id of ["hong-shao-rou", "hui-guo-rou", "di-san-xian", "tang-cu-li-ji"]) {
    const dish = dishes.find((item) => item.id === id);
    assert.ok(dish, `missing dish ${id}`);
    assert.ok(dish.image, `${id} needs a photo`);
    assert.ok(dish.imageCredit, `${id} needs photo attribution`);
    assert.match(dish.imageCredit.sourceUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.match(dish.imageCredit.licenseUrl, /^https:\/\/creativecommons\.org\/licenses\//);
  }
});

test("shared safety calls", () => {
  for (const focus of [
    "unsure",
    "calcium-oxalate",
    "calcium-phosphate",
    "uric-acid",
    "cystine",
    "struvite",
  ] as const) {
    assert.equal(verdict("star-fruit", focus), "limit", focus);
  }
  assert.equal(verdict("grapefruit", "calcium-oxalate"), "careful");
  assert.equal(verdict("table-salt", "calcium-oxalate"), "limit");
  assert.equal(verdict("beer", "unsure"), "careful");
});
