import json
import re
from pypdf import PdfReader

reader = PdfReader(r"C:\Users\xiedo\Downloads\Oxalate-Content-of-Foods.pdf")
text = "\n".join((page.extract_text() or "") for page in reader.pages)
text = text.replace("\u00a0", " ")
text = text.replace("Meat & Meat\nAlternatives", "Meat & Meat Alternatives")
text = text.replace("Fast Food Items or\nMeals", "Fast Food Items or Meals")
text = text.replace("Cereals by\nManufacturer", "Cereals by Manufacturer")
text = text.replace("Other Cereal\nBrands", "Other Cereal Brands")
text = text.replace("Cakes, Candies,\nCookies & Pudding", "Cakes, Candies, Cookies & Pudding")
text = text.replace("Crackers, Chips &\nMiscellaneous", "Crackers, Chips & Miscellaneous")
text = text.replace("Bok Choy (Chinese Cabbage", "Bok Choy (Chinese Cabbage)")

lines = [re.sub(r"\s+", " ", line).strip() for line in text.splitlines()]
lines = [line for line in lines if line and not line.startswith("--")]
lines = [line for line in lines if not line.startswith("Food Group")]

sections = sorted(
    [
        "Whole Fruits",
        "Canned Fruits",
        "Dried Fruits",
        "Cream Products",
        "Ice Creams",
        "Yogurt Products",
        "Cheese Products",
        "Dairy Spreads",
        "Pastas, Rice & Grains",
        "Meat & Meat Alternatives",
        "Nuts and Seeds",
        "Cakes, Candies, Cookies & Pudding",
        "Crackers, Chips & Miscellaneous",
        "Dairy Beverages",
        "Alcoholic Beverages",
        "Spreads, Sauces & Toppings",
        "Fast Food Items or Meals",
        "Breakfast Items",
        "Cereals by Manufacturer",
        "Post Cereals",
        "General Mills",
        "Other Cereal Brands",
        "Kellogg's",
        "Vegetables",
        "Potatoes",
        "Breads & Grains",
        "Meats & Fish",
        "Dairy",
        "Milk",
        "Breads",
        "Fish",
        "Snacks",
        "Beverages",
        "Ingredients",
        "Soups",
        "Quaker",
        "Fruits",
    ],
    key=len,
    reverse=True,
)

cat = r"Very High|Very Low|Little or None|Moderate|High|Low"
row_re = re.compile(rf"^(?P<body>.+?)\s+(?P<category>{cat})\s+(?P<mg>\d+)mg$")

exact_headers = set(sections) | {"Eggs"}
rows = []
pending = ""
group = "Other"

for line in lines:
    if line in exact_headers:
        group = line
        pending = ""
        continue
    candidate = f"{pending} {line}".strip() if pending else line
    match = row_re.match(candidate)
    if not match:
        pending = candidate
        continue
    pending = ""
    body = match.group("body").strip()
    changed = True
    while changed:
        changed = False
        for section in sections:
            prefix = f"{section} "
            if body.startswith(prefix):
                group = section
                body = body[len(prefix) :].strip()
                changed = True
                break
    if not body:
        continue
    if re.match(r"^\d", body):
        body = f"{group} {body}"
    splits = list(re.finditer(r"\s(?=(?:approx\.?\s+)?\d)", body))
    if not splits:
        name = body
        serving = "1 cup" if name == "Soy Flour" else "amount not given"
    else:
        chosen = splits[-1]
        for split in splits:
            possible = body[: split.start()].strip()
            if possible and not re.search(r"(%|\bproof)$", possible):
                chosen = split
                break
        name = body[: chosen.start()].strip(" -")
        serving = body[chosen.start() :].strip()
    name = name.replace("Mushroons", "Mushrooms").replace("Powered Milk", "Powdered Milk")
    name = name.replace("Plaintain", "Plantain").replace("Artificial Sweetner", "Artificial Sweetener")
    name = name.replace("Berry Bust Cheerios", "Berry Burst Cheerios")
    name = name.replace("Nature Valley Cinnimon", "Nature Valley Cinnamon")
    name = name.replace("Oaker Oat Cinnamon Life", "Quaker Oat Cinnamon Life")
    rows.append(
        {
            "group": group,
            "name": name,
            "serving": serving,
            "category": match.group("category"),
            "mg": int(match.group("mg")),
        }
    )

suspicious = [
    row
    for row in rows
    if row["serving"] == "not listed"
    or len(row["serving"]) > 42
    or len(row["name"]) < 3
    or any(word in row["name"] for word in [" cup", " oz", " slice"])
]
print("rows", len(rows), "groups", len({row["group"] for row in rows}))
print("suspicious", len(suspicious))
for row in suspicious:
    print(row)
print("groups:")
for name in dict.fromkeys(row["group"] for row in rows):
    print(" -", name)

rows = [row for row in rows if row["name"] != "Eggs Eggs"]
seen = set()
unique = []
for row in rows:
    key = (row["name"], row["serving"], row["mg"], row["category"])
    if key in seen:
        continue
    seen.add(key)
    unique.append(row)
rows = unique

out = r"C:\Users\xiedo\kidney-stone-diet\lib\oxalate-source.json"
with open(out, "w", encoding="utf-8") as handle:
    json.dump(rows, handle, ensure_ascii=False, indent=2)
