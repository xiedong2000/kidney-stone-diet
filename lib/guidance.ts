import type { Food, Guidance, StoneFocusId, Verdict } from "@/lib/model";

const severity: Record<Verdict, number> = {
  fits: 0,
  careful: 1,
  limit: 2,
};

function strongest(notes: Guidance[]): Guidance {
  const first = notes[0];
  if (!first) {
    throw new Error("guidance notes must not be empty");
  }
  let best = first;
  for (const note of notes.slice(1)) {
    if (severity[note.verdict] > severity[best.verdict]) best = note;
  }
  return best;
}

function sodiumNote(food: Food, focus: StoneFocusId): Guidance | null {
  if (food.sodium === "moderate") {
    if (
      focus === "uric-acid" ||
      focus === "struvite"
    ) {
      return null;
    }
    return {
      verdict: "careful",
      reason:
        "Sodium adds up, and salt raises calcium in the urine. A usual serving can fit when the rest of the day is cooked from fresh food rather than packages and restaurants.",
    };
  }

  if (food.sodium !== "high") return null;

  if (focus === "cystine") {
    return {
      verdict: "limit",
      reason:
        "For cystine stones, cutting sodium is one of the few diet changes that clearly helps, because it lowers cystine in the urine. Keep salty foods like this uncommon.",
    };
  }

  if (focus === "struvite") {
    return {
      verdict: "careful",
      reason:
        "A very salty pattern is a general health problem. It is not how struvite stones are treated. Those come from infection.",
    };
  }

  return {
    verdict: "limit",
    reason:
      "Salt pulls calcium into the urine. A food this salty works against prevention for most stones. Keep it uncommon, and season cooking with herbs, citrus, pepper, or vinegar.",
  };
}

function modestSugarNote(food: Food): Guidance | null {
  if (food.addedSugar !== "moderate" || food.tags.includes("juice")) return null;
  return {
    verdict: "careful",
    reason:
      "There is enough sugar here to keep it occasional. An everyday pattern of sweet drinks and desserts is the one linked with stones.",
  };
}

function sugarNote(food: Food, focus: StoneFocusId): Guidance | null {
  if (food.addedSugar !== "high") return null;

  if (focus === "struvite") {
    return {
      verdict: "careful",
      reason:
        "Sugar-sweetened drinks do not treat infection stones, and they are a poor use of the fluid you drink. Water is the useful choice.",
    };
  }

  if (focus === "uric-acid") {
    return {
      verdict: "limit",
      reason:
        "Sugar, especially in drinks, raises uric acid and makes urine more acidic. Both of those favor uric acid stones. Drop this as a daily drink.",
    };
  }

  return {
    verdict: "limit",
    reason:
      "Sugar-sweetened drinks are linked with more kidney stones, and they do not help you make a large volume of dilute urine. Make water the main drink.",
  };
}

function fallback(focus: StoneFocusId): string {
  switch (focus) {
    case "calcium-oxalate":
      return "Nothing about a normal portion of this food fights the calcium oxalate habits: enough fluid, less salt, calcium from food with meals, and small amounts of the very high-oxalate foods.";
    case "calcium-phosphate":
      return "A normal portion fits the calcium phosphate pattern: enough fluid, less salt, modest meat, and no self-prescribed alkali or juice routine.";
    case "uric-acid":
      return "This is not one of the high-purine foods that matter most for uric acid stones. Keep the pattern: less organ meat and certain seafood, less sugar, more fluid, and ask about alkali.";
    case "cystine":
      return "The diet lever for cystine is a very high fluid intake, less salt, and modest animal protein. This food can sit beside that plan.";
    case "struvite":
      return "This can sit in an ordinary meal. Struvite stones form because of infection, so a food list will not clear them.";
    default:
      return "This fits the general pattern while you wait to learn your stone type: enough fluid, less salt, normal portions, and calcium from food.";
  }
}

function oxalateNote(food: Food, focus: StoneFocusId): Guidance | null {
  if (food.oxalate === "low") return null;

  if (focus === "calcium-oxalate" && food.oxalate === "high") {
    return {
      verdict: "limit",
      reason:
        "This is high in oxalate, which can join calcium in the urine. If you have it, keep the amount small and eat a calcium food at that same meal. Many people do better making it uncommon.",
    };
  }

  if (focus === "calcium-oxalate" && food.oxalate === "moderate") {
    return {
      verdict: "careful",
      reason:
        "Moderate oxalate. A usual serving is reasonable. Trouble comes from a very large portion, or from stacking several oxalate-heavy foods on the same day.",
    };
  }

  if (focus === "unsure" && food.oxalate === "high") {
    return {
      verdict: "careful",
      reason:
        "This is very high in oxalate. That matters most for calcium oxalate stones, or when a urine test shows high oxalate. Until you know, use a small portion instead of building meals around it.",
    };
  }

  if (focus === "unsure" && food.oxalate === "moderate") {
    return {
      verdict: "careful",
      reason:
        "Moderate oxalate. A normal serving fits most plates. Do not cut whole groups of healthy foods before you know whether oxalate is even your issue.",
    };
  }

  if (focus === "calcium-phosphate" && food.oxalate === "high") {
    return {
      verdict: "careful",
      reason:
        "Oxalate is not the main lever for calcium phosphate stones. A small portion is reasonable. There is no need to build the plate around spinach, almonds, or bran.",
    };
  }

  if (
    (focus === "uric-acid" || focus === "cystine") &&
    food.oxalate === "high"
  ) {
    return {
      verdict: "fits",
      reason:
        focus === "uric-acid"
          ? "Oxalate is not the lever for uric acid stones. You do not need to ban spinach-type foods for this stone. Keep the real pattern: fewer high-purine meats and seafoods, less sugar, more fluid."
          : "Oxalate is not the lever for cystine stones. Fluid, salt, and the size of animal-protein portions matter much more than spinach or nuts.",
    };
  }

  return null;
}

function purineNote(food: Food, focus: StoneFocusId): Guidance | null {
  const animal = food.tags.includes("animal") || food.tags.includes("organ");

  if (focus === "uric-acid") {
    if (food.purine === "high" && animal) {
      return {
        verdict: "limit",
        reason:
          "This is high in purines, which the body turns into uric acid. Keep it rare when your stones are uric acid.",
      };
    }
    if (food.tags.includes("animal") && food.purine === "moderate") {
      return {
        verdict: "careful",
        reason:
          "A deck-of-cards portion is a reasonable ceiling. Fill more of the plate with vegetables, fruit, dairy, and grains.",
      };
    }
    if (food.tags.includes("animal") && food.purine === "low") {
      return {
        verdict: "fits",
        reason:
          "This is animal protein with few purines, so it is a reasonable choice for uric acid stones. The foods to cut are organ meats and high-purine seafood.",
      };
    }
    if (food.tags.includes("plant") && food.purine !== "low") {
      return {
        verdict: "fits",
        reason:
          "Plant foods contain purines, and they have not shown the same stone risk as organ meats and certain seafoods. A normal portion can stay.",
      };
    }
  }

  if (
    (focus === "calcium-oxalate" ||
      focus === "calcium-phosphate" ||
      focus === "unsure") &&
    animal &&
    food.purine === "high"
  ) {
    return {
      verdict: "careful",
      reason:
        "Large servings of high-purine animal foods can raise urine calcium and uric acid. Keep this to a small portion, especially if you do not yet know that the stone is uric acid.",
    };
  }

  if (
    (focus === "calcium-oxalate" ||
      focus === "calcium-phosphate" ||
      focus === "unsure") &&
    food.tags.includes("animal") &&
    food.purine === "moderate"
  ) {
    return {
      verdict: "careful",
      reason:
        "A modest serving of meat, poultry, or fish fits. Very large portions raise urine calcium and can lower citrate, which protects against crystals. Think of a deck of cards, not a stacked plate.",
    };
  }

  if (focus === "cystine" && food.tags.includes("animal")) {
    return {
      verdict: "careful",
      reason:
        "Animal protein contains methionine, which the body turns into cystine. Keep portions modest. The larger job is still fluid, spread through the day and the night.",
    };
  }

  return null;
}

function juiceNote(food: Food, focus: StoneFocusId): Guidance | null {
  if (!food.tags.includes("juice")) return null;

  if (focus === "calcium-phosphate") {
    return {
      verdict: "careful",
      reason:
        "Large amounts of citrus juice make urine more alkaline. That can work against calcium phosphate stones. A squeeze in water is different from several glasses of juice. Ask before you start a juice routine.",
    };
  }

  if (focus === "unsure") {
    return {
      verdict: "careful",
      reason:
        "A squeeze of citrus in water is a sound habit. A daily quart of juice is a medical question, because alkali helps some stones and can work against calcium phosphate stones.",
    };
  }

  if (food.addedSugar === "moderate") {
    return {
      verdict: "careful",
      reason:
        "This brings citrate, which can help some stones, and also a real amount of sugar. A small glass is enough. Whole fruit is the better everyday choice.",
    };
  }

  if (focus === "uric-acid" || focus === "cystine" || focus === "calcium-oxalate") {
    return {
      verdict: "fits",
      reason:
        focus === "calcium-oxalate"
          ? "Citrate can make urine less friendly to calcium stones. A dilute lemon or lime drink is a practical habit. It does not replace water."
          : "Citrus can make urine less acidic, which helps uric acid and cystine stay dissolved. Medicine may still be needed. Count the drink toward fluid, not instead of water.",
    };
  }

  return null;
}

function supportiveNote(food: Food, focus: StoneFocusId): Guidance | null {
  if (food.tags.includes("dietary-calcium") && food.sodium !== "high") {
    if (focus === "calcium-phosphate") {
      return {
        verdict: "fits",
        reason:
          "Keep calcium from food, eaten with meals. Do not start calcium pills between meals unless they were prescribed. Pills taken alone can raise urine calcium.",
      };
    }
    return {
      verdict: "fits",
      reason:
        "Food calcium is part of prevention. Eaten with a meal, it binds oxalate in the gut so less oxalate reaches the urine. Do not cut dairy because the stone has the word calcium in it.",
    };
  }

  if (
    food.tags.includes("citrate") &&
    !food.tags.includes("juice") &&
    focus !== "calcium-phosphate"
  ) {
    return {
      verdict: "fits",
      reason:
        "Whole citrus fruit is a reasonable everyday food. The caution is large volumes of juice or alkali supplements, which a clinician should guide.",
    };
  }

  if (
    food.tags.includes("citrate") &&
    !food.tags.includes("juice") &&
    focus === "calcium-phosphate"
  ) {
    return {
      verdict: "fits",
      reason:
        "Whole fruit in a normal serving is fine. The caution for this stone is a large juice habit or an alkali supplement, not an orange with lunch.",
    };
  }

  if (
    food.tags.includes("fluid") &&
    food.addedSugar === "low" &&
    !food.tags.includes("alcohol") &&
    !food.tags.includes("weak-fluid") &&
    !food.tags.includes("potassium-load") &&
    !food.tags.includes("juice")
  ) {
    return {
      verdict: "fits",
      reason:
        "This counts toward the fluid target. Spread drinks through the day, including the evening, unless you have been told to limit fluid.",
    };
  }

  if (
    food.oxalate === "low" &&
    food.sodium === "low" &&
    food.addedSugar !== "high" &&
    !food.tags.includes("animal") &&
    !food.tags.includes("alcohol")
  ) {
    return {
      verdict: "fits",
      reason: fallback(focus),
    };
  }

  return null;
}

function extraNote(food: Food): Guidance | null {
  if (food.tags.includes("medicine")) {
    return {
      verdict: "careful",
      reason:
        "This is not a special stone food for most people. Grapefruit changes how many medicines are broken down, and some patient guides also suggest skipping grapefruit juice. Check it against your own medicines.",
    };
  }

  if (food.tags.includes("potassium-load")) {
    return {
      verdict: "careful",
      reason:
        "A small glass is fine for many people. If your kidneys do not clear potassium well, or you take a potassium medicine, ask before this becomes a daily drink.",
    };
  }

  if (food.tags.includes("alcohol")) {
    return {
      verdict: "careful",
      reason:
        "Alcohol is a poor hydration plan. It increases fluid loss later. If you drink, keep it occasional and match it with water. It does not count as your stone-prevention fluid.",
    };
  }

  if (food.tags.includes("weak-fluid") && food.addedSugar !== "high") {
    return {
      verdict: "careful",
      reason:
        "This crowds out water. An occasional serving is not the main issue. Unsweetened water still has to do the real work.",
    };
  }

  return null;
}

export function guidanceFor(food: Food, focus: StoneFocusId): Guidance {
  if (food.avoidReason) {
    return { verdict: "limit", reason: food.avoidReason };
  }

  const notes: Guidance[] = [];
  const add = (note: Guidance | null) => {
    if (note) notes.push(note);
  };

  if (focus === "struvite") {
    add(sodiumNote(food, focus));
    add(sugarNote(food, focus));
    if (food.tags.includes("organ")) {
      add({
        verdict: "careful",
        reason:
          "Organ meats are a poor everyday protein. Avoiding them will not clear a struvite stone. Infection care and stone removal do that.",
      });
    }
    add(extraNote(food));
    add({ verdict: "fits", reason: fallback(focus) });
    return strongest(notes);
  }

  if (food.tags.includes("organ")) {
    add({
      verdict: "limit",
      reason:
        "Organ meats are extremely high in purines. Most stone clinics suggest skipping them, whatever the stone type.",
    });
  }
  add(oxalateNote(food, focus));
  add(purineNote(food, focus));
  add(sodiumNote(food, focus));
  add(sugarNote(food, focus));
  add(juiceNote(food, focus));
  add(modestSugarNote(food));
  add(extraNote(food));
  add(supportiveNote(food, focus));
  add({ verdict: "fits", reason: fallback(focus) });

  return strongest(notes);
}
