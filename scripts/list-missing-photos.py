import re

text = open("lib/dishes.ts", encoding="utf-8").read()
blocks = re.findall(r"dish\(\{.*?\n  \}\),", text, re.S)
print("dishes", len(blocks))
missing = []
for block in blocks:
    dish_id = re.search(r'id: "([^"]+)"', block).group(1)
    name = re.search(r'name: "([^"]+)"', block).group(1)
    original = re.search(r'originalName: "([^"]+)"', block)
    cuisine = re.search(r'cuisine: "([^"]+)"', block).group(1)
    if "image:" not in block:
        missing.append((cuisine, dish_id, name, original.group(1) if original else ""))
print("missing", len(missing))
for row in missing:
    print("|".join(row))
