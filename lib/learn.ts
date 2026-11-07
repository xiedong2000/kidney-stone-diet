export const habits = [
  {
    id: "fluid",
    title: "Drink enough to make a lot of urine",
    lede: "This is the habit with the best evidence. Stones form more easily in concentrated urine.",
    points: [
      "The American Urological Association standard is fluid intake that produces at least 2.5 liters of urine a day.",
      "For many adults that means roughly 3 liters of drinks, spread from morning through a glass in the evening. Heat, exercise, and diarrhea raise the amount.",
      "A public page from the National Institute of Diabetes and Digestive and Kidney Diseases gives a simpler starting point of 6 to 8 glasses. That is often not enough to reach 2.5 liters of urine. Use your own clinician's number.",
      "Pale yellow urine is a rough home check. A 24-hour collection is the real measurement.",
      "If you have heart failure, advanced kidney disease, or a fluid restriction, do not follow a high-fluid target until someone who knows that condition sets it.",
    ],
  },
  {
    id: "sodium",
    title: "Cut salt, not just the salt shaker",
    lede: "Sodium raises calcium in the urine. That matters for calcium stones and for cystine stones.",
    points: [
      "A common adult ceiling is 2,300 mg of sodium a day, about one teaspoon of salt. Some stone clinics aim lower. Blood pressure and kidney disease can change the number.",
      "Most sodium is already in food: bread from a bakery case, canned soup, sauces, deli meat, cheese sauces, and restaurant meals.",
      "Cook with herbs, garlic, citrus, vinegar, and pepper. Taste before you salt at the table.",
      "Low sodium on a label in the United States means 140 mg or less per serving. The percent daily value is a quick scan: 5% is low, 20% is high.",
    ],
  },
  {
    id: "calcium",
    title: "Keep calcium from food, and eat it with meals",
    lede: "A calcium stone is not a reason to avoid calcium. A low-calcium diet can raise oxalate in the urine and weaken bone.",
    points: [
      "For calcium stones with high urine calcium, the AUA advises limiting sodium and eating 1,000 to 1,200 mg of calcium a day from food.",
      "A cup of milk, a cup of yogurt, and a slice or two of cheese are the usual servings. Fortified foods and calcium-set tofu can help if you do not drink milk.",
      "Eat the calcium food at the meal that contains oxalate, so they bind in the gut.",
      "Do not start calcium pills between meals to prevent stones. Taken alone, they can raise urine calcium. If a clinician prescribed calcium, ask when to take it.",
      "A trial in the New England Journal of Medicine in 2002 found fewer repeat calcium oxalate stones on a normal-calcium, low-salt, moderate-protein diet than on a low-calcium diet.",
    ],
  },
  {
    id: "protein",
    title: "Keep meat, poultry, and fish modest",
    lede: "Large amounts of animal protein raise urine calcium and uric acid, and they can lower citrate, which helps stop crystals.",
    points: [
      "A deck-of-cards portion at a meal is the picture many dietitians use. The rest of the plate can be vegetables, fruit, and grains.",
      "For uric acid stones, and for calcium stones with high urine uric acid, the specific advice is to limit non-dairy animal protein. Dairy can stay as your calcium source.",
      "Organ meats, anchovies, sardines, mussels, and meat gravies are the purine foods to keep rare.",
      "Beans and lentils can replace some of the meat. Their purines have not shown the same risk as those meats and seafoods.",
    ],
  },
  {
    id: "oxalate",
    title: "Limit oxalate only when it is your problem",
    lede: "Oxalate is a natural part of many plants. It joins calcium in the urine. It is not a reason to stop eating vegetables.",
    points: [
      "The AUA suggests limiting oxalate-rich foods when urine oxalate is high, while keeping normal calcium intake. If urine oxalate is normal, a strict ban is usually the wrong project.",
      "A 2020 handout by Pam Hilton lists milligrams per serving. Its Very High label starts near 12 mg, while cooked spinach is 755 mg per half cup. Read the number, not only the label.",
      "The foods that actually move the number are the very high ones: spinach, rhubarb, Swiss chard, beet greens, beets, almonds, cashews, wheat bran, and instant tea.",
      "Kale, broccoli, cabbage, lettuce, cucumber, melon, apples, and bananas are low-oxalate foods. They are not spinach.",
      "Boiling a high-oxalate vegetable and discarding the water lowers oxalate. It does not turn spinach into a low-oxalate food.",
      "People with gastric bypass, Crohn's disease, or chronic diarrhea can absorb much more oxalate. That needs a dietitian, not a generic list. Extra calcium with meals is often part of that plan.",
    ],
  },
  {
    id: "citrate",
    title: "Use citrus as food, not as a self-prescribed medicine",
    lede: "Citrate in urine makes calcium crystals less likely. Low citrate is a common finding on a 24-hour urine test.",
    points: [
      "Whole fruit and vegetables, and a squeeze of lemon or lime in water, fit most plans.",
      "If citrate is low, the AUA encourages more fruits and vegetables and less non-dairy animal protein. A prescription such as potassium citrate is a separate decision.",
      "Calcium phosphate stones are often the exception. Extra alkali can make urine more alkaline, which those stones prefer. Do not start a large juice habit for this stone without asking.",
      "Uric acid stones and cystine stones often do need alkali. Diet alone may not be enough.",
    ],
  },
  {
    id: "sugar",
    title: "Drop sugar-sweetened drinks",
    lede: "These drinks are linked with a higher chance of stones, and they do not help you make dilute urine.",
    points: [
      "Soda, sweet tea, lemonade from a mix, energy drinks, and most sports drinks belong in the uncommon column.",
      "Fructose in sugary drinks is a particular problem for uric acid.",
      "Diet soda is a lesser issue. It still should not replace water.",
    ],
  },
  {
    id: "supplements",
    title: "Ask before supplements",
    lede: "Food patterns and supplement bottles are different exposures.",
    points: [
      "High-dose vitamin C can raise oxalate in some people. Patient guides often flag supplements around 1,000 mg a day. Vitamin C in fruit and peppers can stay.",
      "Calcium pills, vitamin D, and products sold as turmeric, cinnamon, or greens powders can change stone risk. A pinch of spice in food is not the same as a capsule.",
      "Crash diets and high-protein weight-loss plans raise stone risk. Weight loss can help if you are carrying extra weight. The pace and the protein load matter.",
    ],
  },
] as const;

export const stoneGuides = [
  {
    id: "calcium-oxalate",
    title: "Calcium oxalate",
    frequency: "The most common stone",
    summary:
      "Calcium and oxalate join in the urine. The diet response is not 'eat less calcium.' It is more fluid, less salt, calcium from food with meals, modest meat, and fewer of the very high-oxalate foods when urine oxalate is high.",
    doThis: [
      "Drink enough to make at least 2.5 liters of urine, unless you have a fluid limit.",
      "Keep sodium near or under 2,300 mg unless you have been given a different number.",
      "Eat 1,000 to 1,200 mg of calcium from food, with meals.",
      "Swap spinach salads for kale, cabbage, or lettuce.",
      "Use walnuts instead of a daily handful of almonds if you want a nut.",
    ],
    leaveAlone: [
      "Do not cut dairy because the stone contains calcium.",
      "Do not ban every plant food that contains any oxalate.",
      "Do not start calcium tablets between meals on your own.",
    ],
  },
  {
    id: "calcium-phosphate",
    title: "Calcium phosphate",
    frequency: "Less common, and easy to confuse with the oxalate stone",
    summary:
      "These stones prefer alkaline urine. The shared habits still help: fluid, less sodium, food calcium with meals, modest animal protein. Alkali is the point where this stone parts company with uric acid and cystine.",
    doThis: [
      "Follow the fluid, sodium, and food-calcium habits.",
      "Keep meat portions modest so citrate in the urine is not driven down.",
      "Ask whether any medicine is making the urine more alkaline. Some seizure and migraine medicines do this.",
      "Ask before potassium citrate, baking soda, or a large daily juice routine.",
    ],
    leaveAlone: [
      "Do not copy a uric-acid plan that pushes alkali.",
      "Do not assume a spinach ban is your main task. Oxalate is not the center of this stone.",
    ],
  },
  {
    id: "uric-acid",
    title: "Uric acid",
    frequency: "More likely when urine is acidic, and with gout, insulin resistance, or a high-meat pattern",
    summary:
      "Uric acid stays dissolved better when urine is less acidic and less concentrated. Diet can help. A prescription to alkalinize the urine is often what actually changes the pH.",
    doThis: [
      "Make water the drink, and keep sugar-sweetened drinks out.",
      "Keep organ meats, anchovies, sardines, mussels, and gravy rare.",
      "Use dairy, eggs, beans, and a modest portion of ordinary fish or poultry.",
      "Eat fruit and vegetables. A lemon in water is reasonable.",
      "Ask whether potassium citrate or another alkali is indicated. Do not dose baking soda yourself.",
    ],
    leaveAlone: [
      "Do not build a low-oxalate diet for this stone. That is the wrong lever.",
      "Do not use a crash high-protein diet to lose weight.",
    ],
  },
  {
    id: "cystine",
    title: "Cystine",
    frequency: "Uncommon, and genetic",
    summary:
      "Cystine leaks into the urine. The diet work is a very high urine volume, less sodium, and modest animal protein. Many people also need medicine to raise the pH or bind cystine.",
    doThis: [
      "Ask for a personal fluid target. It is often enough to make more than 3 liters of urine, including overnight.",
      "Cut sodium with the same seriousness as a blood-pressure diet.",
      "Keep meat portions modest because methionine becomes cystine.",
      "Plan a night glass of water if your clinician wants urine dilute around the clock.",
    ],
    leaveAlone: [
      "Do not expect a vegetable ban to treat this stone.",
      "Do not stop prescribed alkali or tiopronin-type medicines because a food list felt simpler.",
    ],
  },
  {
    id: "struvite",
    title: "Struvite",
    frequency: "An infection stone",
    summary:
      "Bacteria that make urease turn urine conditions toward struvite. The treatment is to clear the infection and, usually, to remove the stone so bacteria are not sheltered inside it. Diet does not sterilize a stone.",
    doThis: [
      "Follow the urology plan and finish the treatment you were given.",
      "Drink normally unless told otherwise, and eat an ordinary healthy pattern.",
      "Come back for fever, vomiting, or pain you cannot control. An infected, blocked kidney is urgent.",
    ],
    leaveAlone: [
      "Do not spend the month eliminating spinach and hope the infection stone dissolves.",
      "Do not delay care in favor of a supplement.",
    ],
  },
] as const;

export const mealPlans = [
  {
    id: "unsure",
    title: "When the stone type is still unknown",
    intro:
      "This day uses the habits that help almost everyone: fluid, less salt, calcium with meals, and modest meat. It does not ban vegetables.",
    meals: [
      {
        name: "Breakfast",
        plate: "Oatmeal cooked with milk, a banana, and one egg.",
        why: "Milk in the same bowl as a moderate-oxalate grain. The egg is protein without a large purine load.",
      },
      {
        name: "Lunch",
        plate:
          "Rice or bread, a deck-of-cards portion of chicken, broccoli and peppers, and an apple.",
        why: "The plate is mostly plants. The meat is a portion, not the whole meal.",
      },
      {
        name: "Dinner",
        plate:
          "A piece of salmon, a potato with herbs instead of a salty sauce, lettuce and cucumber salad with lemon and oil, and a glass of milk.",
        why: "Calcium is at the meal. The salad uses lettuce, so it does not depend on spinach.",
      },
      {
        name: "Snack",
        plate: "Plain yogurt and blueberries, or cheese and an apple.",
        why: "A calcium food you can actually repeat, instead of a salty packaged snack.",
      },
    ],
    drinks:
      "Water at each meal and between meals, plus coffee or unsweetened tea if you want them. A lemon wedge is fine. Skip soda and sweet tea.",
  },
  {
    id: "calcium-oxalate",
    title: "Calcium oxalate day",
    intro:
      "Same bones as the general day, with the high-oxalate foods left out on purpose. This is a pattern, not a prescription.",
    meals: [
      {
        name: "Breakfast",
        plate: "Plain yogurt, melon, eggs, and a slice of bread.",
        why: "Yogurt covers calcium early. Melon is a low-oxalate fruit.",
      },
      {
        name: "Lunch",
        plate:
          "Turkey or chicken you cooked yourself, sourdough, lettuce, cheese, cucumber, and an apple.",
        why: "Deli meat would make this a sodium meal. Cooking the poultry avoids that.",
      },
      {
        name: "Dinner",
        plate:
          "Chicken, white rice, roasted cabbage and carrots, and a glass of milk.",
        why: "Rice and cabbage keep oxalate low. Milk is at the table, not saved for a lonely glass at night.",
      },
      {
        name: "If you want something extra",
        plate: "A few walnuts, or a square of chocolate only sometimes. Not a bowl of almonds.",
        why: "Almonds and bran cereal are the easy foods to stop repeating.",
      },
    ],
    drinks:
      "Water through the day, including evening. Lemon water is reasonable. Instant tea and sweet tea stay out.",
  },
  {
    id: "uric-acid",
    title: "Uric acid day",
    intro:
      "The plate shifts toward dairy, eggs, plants, and a smaller piece of meat. Sugar-sweetened drinks are the clearest drink to remove.",
    meals: [
      {
        name: "Breakfast",
        plate: "Plain yogurt, oatmeal, and blueberries.",
        why: "Dairy and grain instead of bacon and sweetened coffee.",
      },
      {
        name: "Lunch",
        plate: "Lentil soup you salted lightly, a kale salad, and an orange.",
        why: "Plant protein and fruit. Kale does not need to be avoided for this stone.",
      },
      {
        name: "Dinner",
        plate:
          "A small chicken thigh or a fillet of ordinary fish, a large serving of vegetables, potato or pasta, and milk.",
        why: "Meat is present and not the center. Sardines, liver, and gravy are not on this plate.",
      },
      {
        name: "Snack",
        plate: "An apple and cheese, or cherries.",
        why: "Keeps you from hunting for a sweet drink later.",
      },
    ],
    drinks:
      "Water is the main drink. Coffee or tea without sugar can count. Ask your clinician before you treat lemon juice as a substitute for prescribed alkali.",
  },
] as const;

export const visitQuestions = [
  "What was the stone made of?",
  "Can we do a 24-hour urine collection? I want volume, calcium, oxalate, uric acid, citrate, sodium, and how acidic the urine was.",
  "How much should I drink, and is there any reason I should limit fluid?",
  "What sodium and calcium targets fit me, including my blood pressure and kidney function?",
  "Is my urine oxalate high enough that a short list of foods is worth limiting?",
  "Do any of my medicines or supplements change urine chemistry?",
  "Do I need a prescription such as potassium citrate, a thiazide, or a uric acid medicine — or should I avoid extra alkali?",
  "Should I see a registered dietitian who works with kidney stones?",
] as const;

export const sources = [
  {
    name: "Pam Hilton",
    title: "Oxalate Content of Foods (2020)",
    href: "/oxalate",
    note: "Serving-by-serving oxalate values used on this site, from the spreadsheet exported on June 16, 2020. The sheet's own Very High label starts near 12 mg per serving. The checker treats 50 mg or more as high.",
  },
  {
    name: "National Institute of Diabetes and Digestive and Kidney Diseases",
    title: "Eating, Diet, & Nutrition for Kidney Stones",
    href: "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/eating-diet-nutrition",
    note: "Patient overview. It lists spinach, nuts, peanuts, rhubarb, and wheat bran as oxalate foods to reduce for calcium oxalate stones, and it tells readers not to guess a plan without knowing the stone type.",
  },
  {
    name: "American Urological Association",
    title: "Medical Management of Kidney Stones, 2026 guideline",
    href: "https://www.auanet.org/guidelines-and-quality/guidelines/medical-management-of-kidney-stones",
    note: "The clinician standard this site follows for goals: urine volume of at least 2.5 liters a day, 1,000 to 1,200 mg of food calcium with sodium limits when urine calcium is high, oxalate limits when urine oxalate is high, and less non-dairy animal protein when citrate is low or uric acid is high.",
  },
  {
    name: "National Kidney Foundation",
    title: "Kidney stones diet and prevention",
    href: "https://www.kidney.org/kidney-topics/kidney-stones-diet-and-prevention",
    note: "States plainly that there is no single kidney-stone diet, and that stopping calcium foods can raise the chance of calcium oxalate stones.",
  },
  {
    name: "Borghi and colleagues, New England Journal of Medicine, 2002",
    title:
      "Comparison of two diets for the prevention of recurrent stones in idiopathic hypercalciuria",
    href: "https://www.nejm.org/doi/full/10.1056/NEJMoa010369",
    note: "Men with calcium oxalate stones and high urine calcium had fewer recurrences on a normal-calcium, low-salt, lower-animal-protein diet than on a low-calcium diet.",
  },
  {
    name: "National Heart, Lung, and Blood Institute",
    title: "DASH eating plan",
    href: "https://www.nhlbi.nih.gov/education/dash-eating-plan",
    note: "A produce-rich, lower-salt, normal-dairy pattern. NIDDK notes that DASH-style eating has been linked with fewer kidney stones.",
  },
] as const;

export const reviewed = "November 2026";
