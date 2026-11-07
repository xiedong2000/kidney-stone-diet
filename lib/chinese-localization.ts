import type { Food, Guidance, StoneFocusId } from "@/lib/model";

type FoodTranslation = {
  name: string;
  tip: string;
};

const foodTranslations: Record<string, FoodTranslation> = {
  water: {
    name: "水",
    tip: "除非医生要求限制饮水，否则全天分次喝水，包括晚间。许多结石患者会以每天尿量至少 2.5 升为目标。",
  },
  "lemon-lime": {
    name: "柠檬或青柠",
    tip: "在水里挤一点柠檬或青柠是简单的日常选择。果肉本身不是高草酸食物。",
  },
  orange: { name: "橙子", tip: "吃完整水果比喝一大杯果汁更合适，也能保留膳食纤维。" },
  milk: {
    name: "牛奶",
    tip: "建议随餐饮用，让食物中的钙与同餐的草酸结合。通常不需要因为结石含钙就戒掉奶制品。",
  },
  apple: { name: "苹果", tip: "完整水果适合作为日常选择；无糖苹果泥也可以。" },
  banana: { name: "香蕉", tip: "普通份量通常适合日常饮食。" },
  blueberries: { name: "蓝莓", tip: "普通份量通常适合日常饮食。" },
  grapes: {
    name: "葡萄",
    tip: "普通一串葡萄通常可以。葡萄干是脱水后的葡萄，糖分更集中。",
  },
  strawberries: {
    name: "草莓",
    tip: "普通一份不等于菠菜那样的高草酸食物。需要留意的是每天吃非常大的一碗。",
  },
  spinach: {
    name: "菠菜",
    tip: "参考资料列出熟菠菜每半杯含 755 mg 草酸、每杯生菠菜含 656 mg。若要吃，份量宜小，并在同一餐搭配牛奶、酸奶或奶酪等含钙食物。",
  },
  broccoli: { name: "西兰花", tip: "低草酸蔬菜，通常可以作为日常蔬菜食用。" },
  cabbage: {
    name: "甘蓝",
    tip: "低草酸。餐馆凉拌卷心菜可能含较多盐或糖，自制更容易控制。",
  },
  "napa-cabbage": {
    name: "大白菜",
    tip: "适合用于汤、炒菜和饺子的低草酸蔬菜。点餐时可请餐馆少放盐，酱汁另放。",
  },
  "bok-choy-vegetable": {
    name: "小白菜（青江菜）",
    tip: "低草酸叶菜。外出点餐可要求少放调味料，或把酱汁另放。",
  },
  celery: {
    name: "芹菜",
    tip: "参考资料列出生芹菜每根含 3 mg 草酸；熟芹菜每杯含 10 mg。这些是参考份量，不是每日上限。餐馆汤品和炒菜的汤底或酱汁可能含较多钠。",
  },
  daikon: {
    name: "白萝卜（大根）",
    tip: "作为汤、炒菜或配菜的一般蔬菜份量通常是合理的起点。参考资料中的“萝卜”每 10 个列为 0 mg，但没有说明是白萝卜或对应的白萝卜份量，因此不能当作白萝卜的精确测量值。",
  },
  corn: {
    name: "玉米",
    tip: "一般份量通常适合许多结石预防饮食。参考资料列出半杯玉米含 1 mg 草酸；另需留意咸黄油或调味料。",
  },
  eggs: {
    name: "鸡蛋",
    tip: "实用且嘌呤较少的蛋白质选择。烹调时少放盐，可搭配辣椒或羽衣甘蓝等蔬菜。",
  },
  chicken: {
    name: "鸡肉",
    tip: "一餐肉类份量可参考一副扑克牌大小。餐盘其余部分多放蔬菜和谷物。",
  },
  beef: {
    name: "牛肉",
    tip: "适量可以纳入饮食。特别是经常吃很大份牛排，可能不利于尿液成分。",
  },
  pork: {
    name: "猪肉",
    tip: "适量猪肉可以纳入饮食。培根、火腿和香肠在肉之外还会带来较多钠。",
  },
  lamb: {
    name: "羊肉",
    tip: "适量、约手掌大小的一份通常可以纳入饮食。若有尿酸结石，应控制肉类份量，并让餐盘多一些蔬菜、水果、奶制品和谷物。",
  },
  salmon: {
    name: "三文鱼",
    tip: "一块鱼肉可参考一副扑克牌大小；这与凤尾鱼或沙丁鱼等高嘌呤鱼类不同。",
  },
  shrimp: { name: "虾", tip: "适量食用，并留意餐馆酱汁、腌料和调味料中的盐。" },
  tofu: {
    name: "豆腐",
    tip: "注意份量。钙盐点制的豆腐也算含钙食物；草酸为中等水平，钙草酸结石患者通常可适量食用。参考份量 3.5 盎司约为 100 克（按重量），不是每日上限。",
  },
  yogurt: {
    name: "原味酸奶",
    tip: "食物中的钙有助于结石预防。选择无糖或少添加糖的款式，并可随餐食用。",
  },
  "soy-sauce": {
    name: "酱油",
    tip: "一汤匙就可能带来较多钠。量取少量使用，或选择低钠款；也可用姜、蒜和醋增加风味。",
  },
  "bamboo-shoots": {
    name: "竹笋",
    tip: "参考资料列出每杯含 35 mg 草酸。炒菜时，酱油的影响可能不亚于竹笋本身。",
  },
  "tomato-egg": {
    name: "番茄炒蛋",
    tip: "自家烹调通常比餐馆菜更容易控制，少放盐即可。番茄草酸属普通水平，不是菠菜那种程度。",
  },
  "steamed-fish": {
    name: "清蒸鱼",
    tip: "可请餐馆把酱油另放，或只用一茶匙而不是大量淋酱。清蒸比油炸更合适。",
  },
  dumplings: {
    name: "水饺",
    tip: "饺子本身可以吃，重点是少蘸咸酱。醋和少量辣椒比大量酱油含钠更少。煎饺会增加油脂，但不代表新的结石问题。",
  },
  "bok-choy": {
    name: "蒜蓉小白菜",
    tip: "这是低草酸绿叶菜。自家烹调时可用蒜调味；蚝油和大量酱油会让同一道菜变得很咸。",
  },
  congee: {
    name: "白粥",
    tip: "配菜可避免咸鸭蛋、腌芥菜和油条，以减少钠。加鸡蛋或清淡鱼肉是更合适的搭配。",
  },
  "mapo-tofu": {
    name: "麻婆豆腐",
    tip: "餐馆豆瓣酱和高汤可能让这道菜很咸。少放一半豆瓣酱、使用钙盐点制豆腐的家常版本会不同。",
  },
  "fried-rice": {
    name: "餐馆炒饭",
    tip: "在家用剩饭、鸡蛋、葱和量取的少量酱油炒制更容易控制；外卖炒饭通常含盐较多。",
  },
  "milk-tea": {
    name: "珍珠奶茶",
    tip: "这相当于一杯甜点。想喝茶可选无糖茶；热茶中加少量牛奶也能搭配食物钙。",
  },
  "hot-pot": {
    name: "火锅",
    tip: "选择清汤，多吃蔬菜和豆腐，少用芝麻酱和动物内脏。麻辣油汤再加大量蘸料会让钠摄入偏高。",
  },
  "kung-pao": {
    name: "宫保鸡丁",
    tip: "花生会带来中等草酸，餐馆酱汁可能含盐和糖。少量配较多米饭，与把整餐都吃成这道菜不同。",
  },
  "white-cut-chicken": {
    name: "白切鸡",
    tip: "清淡搭配可包括白切鸡、姜葱和米饭，蘸料少量即可。肉类仍以一副扑克牌大小为参考，不是半只鸡。",
  },
  xiaolongbao: {
    name: "小笼包",
    tip: "汤汁馅料通常像浓汤一样调味。作为一餐的一部分吃几个，与一笼小笼包再加酱油不同。",
  },
  "steamed-egg": {
    name: "蒸蛋",
    tip: "简单的家常菜。清淡调味；额外淋上的酱油或咸高汤会增加钠。",
  },
  "beef-noodle-soup": {
    name: "牛肉面",
    tip: "餐馆汤底通常较咸。可选小碗或少喝汤，并把牛肉计入一餐的肉类份量。不同餐馆做法和调味不同。",
  },
  "wonton-soup": {
    name: "馄饨汤",
    tip: "汤底和蘸料可能较咸。可要求汤另放或选小份；不同餐馆的馅料也不同。",
  },
  "stir-fried-seasonal-greens": {
    name: "清炒时蔬",
    tip: "点餐时问清使用哪种青菜，并要求少放调味料。如果使用菠菜或其他高草酸蔬菜，可单独查询该食材。",
  },
  "steamed-bun": {
    name: "馒头",
    tip: "白馒头属于谷物主食。带馅的馒头成分不同，应另外查询馅料，并留意咸酱。",
  },
  "scallion-pancake": {
    name: "葱油饼",
    tip: "可作为一份谷物主食。餐馆版本可能较咸或较油。",
  },
};

const focusTranslations: Record<StoneFocusId, { label: string; summary: string }> = {
  unsure: {
    label: "还不确定",
    summary: "等待结石分析或尿液检查期间，先遵循多数结石患者适用的习惯。不要过早大量忌口。",
  },
  "calcium-oxalate": {
    label: "草酸钙结石",
    summary: "常见类型。保证饮水、少盐、随餐摄取食物中的钙，并控制极高草酸食物的份量。",
  },
  "calcium-phosphate": {
    label: "磷酸钙结石",
    summary: "饮水、少盐和适量肉类仍重要。大量果汁或自行补充碱剂可能不合适，请先咨询医生。",
  },
  "uric-acid": {
    label: "尿酸结石",
    summary: "减少高嘌呤肉类和海鲜，少喝含糖饮料，并咨询医生是否需要碱化尿液。草酸不是主要重点。",
  },
  cystine: {
    label: "胱氨酸结石",
    summary: "通常需要大量饮水、少盐和适量动物蛋白；药物治疗也很常见。",
  },
  struvite: {
    label: "感染性结石（磷酸铵镁）",
    summary: "这类结石与感染有关，饮食清单不能治疗；应遵循感染治疗和结石处理方案。",
  },
};

const ui = {
  searchLabel: "你准备食用或点什么？",
  searchPlaceholder: "搜索菜品或输入食材",
  unlistedHint: "未收录的菜品可用逗号分隔输入主要食材。",
  stoneType: "结石类型",
  cuisine: "餐馆 / 菜系",
  browse: "浏览",
  matches: "项匹配",
  match: "项匹配",
  notFound: "本指南未找到：",
  matchedIngredients: "以下结果仅包含本指南可以查询的食材。",
  noResultTitle: "本指南暂未收录这项食物或菜品。",
  noResultBody:
    "没有匹配结果不代表它安全或不安全。查询餐馆菜品时，可用逗号分隔输入主要食材，例如：牛肉、面条、小白菜、酱油。食谱、酱料和份量各不相同，可询问餐馆菜品成分，并在需要时要求酱汁或汤另放。",
  curatedGuide: "本指南仅收录部分常见食物，并非完整菜单数据库，也不会自动计算营养。",
  servingNote: "份量 / 点餐建议：",
  oxalatePortion: "草酸参考值：",
  why: "为什么这样建议？",
  oxalate: "草酸",
  sodium: "钠",
  purine: "嘌呤",
  sugar: "添加糖",
  notListed: "此品种未收录草酸数据",
  missingVarietyValue: "参考资料没有提供此品种的专属草酸数值。",
  sourceNote: "草酸数值来自食物资料表；不同食物品种和烹调方式会使数值有所差异。",
  referenceOnly: "这是参考份量，不是每日上限。",
} as const;

export function containsChineseText(value: string): boolean {
  return /\p{Script=Han}/u.test(value);
}

export function chineseFoodName(food: Food): string {
  return (
    foodTranslations[food.id]?.name ??
    food.aliases.find(containsChineseText) ??
    (food.originalName && containsChineseText(food.originalName) ? food.originalName : food.name)
  );
}

export function chineseFoodTip(food: Food): string {
  return foodTranslations[food.id]?.tip ?? "请按一般份量食用；若有个人饮食限制，请遵循医疗团队的建议。";
}

export function chineseFocus(focus: StoneFocusId) {
  return focusTranslations[focus];
}

export function chineseUi() {
  return ui;
}

export function chineseVerdict(verdict: Guidance["verdict"]): string {
  if (verdict === "fits") return "通常可以";
  if (verdict === "careful") return "注意份量";
  return "尽量少吃";
}

export function chineseGuidance(food: Food, focus: StoneFocusId, verdict: Guidance["verdict"]): string {
  if (food.oxalate === "not-listed") {
    return "参考资料未单独列出此品种，因此没有该品种专属的草酸数值。一般蔬菜份量可作为起点；如有个人草酸目标，请遵循医疗团队建议。";
  }
  if (focus === "calcium-oxalate" && food.oxalate === "high") {
    return "草酸含量较高。若食用，建议少量，并在同一餐搭配含钙食物；具体限制请结合尿液检查和医生建议。";
  }
  if ((focus === "calcium-oxalate" || focus === "unsure") && food.oxalate === "moderate") {
    return "草酸含量中等。一般份量通常可以纳入饮食，避免一次吃很多或同一天叠加多种高草酸食物。";
  }
  if (focus === "uric-acid" && food.tags.includes("animal") && food.purine === "moderate") {
    return "肉类和海鲜的份量宜适中，可参考一副扑克牌大小；餐盘多搭配蔬菜、水果、奶制品和谷物。";
  }
  if (food.sodium === "high") {
    return "这道食物或常见做法可能含较多钠。少盐烹调、酱汁另放，并留意全天总盐摄入。";
  }
  if (verdict === "limit") return "建议少吃或偶尔食用；请结合结石类型和医疗团队给出的个人建议。";
  if (verdict === "careful") return "通常可以吃，但建议注意份量或烹调方式；上方已列出更具体的份量建议。";
  return "按一般份量，这种食物通常可以作为均衡饮食的一部分。";
}

export function chineseLevel(level: Food["oxalate"] | Food["sodium"] | Food["purine"]): string {
  if (level === "not-listed") return ui.notListed;
  if (level === "low") return "低";
  if (level === "moderate") return "中";
  return "高";
}

export function chineseServing(serving: string): string {
  const exact: Record<string, string> = {
    "1/2 cup": "1/2 杯",
    "1 cup": "1 杯",
    "1/2 cup chopped": "1/2 杯（切碎）",
    "1 stalk": "1 根",
    "1 tortilla": "1 张玉米饼",
    "1 ring": "1 圈",
    "3.5 oz": "3.5 盎司（约 100 克，按重量）",
    "1 Tbs": "1 汤匙",
    "1 tbs": "1 汤匙",
    "1 oz": "1 盎司（约 28 克）",
  };
  return exact[serving] ?? serving
    .replace(/\bcups?\b/gi, "杯")
    .replace(/\boz\b/gi, "盎司")
    .replace(/\btbs\b/gi, "汤匙")
    .replace(/\btsp\b/gi, "茶匙");
}

export function chineseOxalateCategory(category: string | undefined): string {
  if (!category) return "";
  const categories: Record<string, string> = {
    "Little or None": "极少或没有",
    "Very Low": "极低",
    Low: "低",
    Moderate: "中等",
    High: "高",
    "Very High": "极高",
  };
  return categories[category] ?? category;
}
