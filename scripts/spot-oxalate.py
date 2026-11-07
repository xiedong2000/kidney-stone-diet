import json

rows = json.load(open(r"lib/oxalate-source.json", encoding="utf-8"))
need = [
    "Spinach",
    "Bok",
    "Oatmeal",
    "Iced Tea",
    "Almond",
    "Miso",
    "Eggs",
    "Olive",
    "All-Bran",
    "Burrito",
    "French",
    "Rhubarb",
    "Navy",
    "Okra",
    "Orange",
    "Strawber",
    "Raspber",
    "Tofu",
    "Coffee",
    "Tea",
    "Kiwi",
    "Dates",
    "Cocoa",
    "Potato",
    "Walnuts",
    "Peanut",
    "Kale",
    "Soy Milk",
]
for needle in need:
    hits = [row for row in rows if needle.lower() in row["name"].lower()]
    print("==", needle, len(hits))
    for hit in hits[:8]:
        print(
            " ",
            hit["group"],
            "|",
            hit["name"],
            "|",
            hit["serving"],
            "|",
            hit["mg"],
            "|",
            hit["category"],
        )
print("TOTAL", len(rows))
