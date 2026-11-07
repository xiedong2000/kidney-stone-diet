import assert from "node:assert/strict";
import { test } from "node:test";
import { featuredFoodIds, foods } from "./foods";
import { guidanceFor } from "./guidance";
import { stoneFocuses, type StoneFocusId, type Verdict } from "./model";

function verdict(id: string, focus: StoneFocusId): Verdict {
  const food = foods.find((item) => item.id === id);
  assert.ok(food, `missing food ${id}`);
  return guidanceFor(food, focus).verdict;
}

test("calcium oxalate limits the very high-oxalate foods", () => {
  for (const id of ["spinach", "rhubarb", "swiss-chard", "almonds", "wheat-bran", "instant-tea"]) {
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

test("uric acid targets purines and sugar, not oxalate", () => {
  assert.equal(verdict("sardines", "uric-acid"), "limit");
  assert.equal(verdict("liver", "uric-acid"), "limit");
  assert.equal(verdict("spinach", "uric-acid"), "fits");
  assert.equal(verdict("lentils", "uric-acid"), "fits");
  assert.equal(verdict("eggs", "uric-acid"), "fits");
  assert.equal(verdict("chicken", "uric-acid"), "careful");
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
