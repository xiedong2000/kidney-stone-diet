import assert from "node:assert/strict";
import { test } from "node:test";
import { foodSearchScore } from "./food-search";
import { foods } from "./foods";

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

  assert.equal(foodSearchScore(spinach, "blueberry"), null);
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
