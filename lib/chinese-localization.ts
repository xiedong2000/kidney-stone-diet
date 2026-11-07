import type { Food, Guidance, StoneFocusId } from "@/lib/model";

type FoodTranslation = {
  name: string;
  tip: string;
  summary?: string;
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
    summary: "若要吃菠菜，份量宜小，并在同一餐搭配含钙食物。",
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
  "gai-lan": {
    name: "芥兰（芥蓝）",
    tip: "普通蔬菜份量通常是合理的起点。芥兰不同于普通西兰花，参考资料没有单独列出其草酸数据。餐馆的蚝油和其他调味料可能含较多钠。",
  },
  celery: {
    name: "芹菜",
    tip: "参考资料列出生芹菜每根含 3 mg 草酸；熟芹菜每杯含 10 mg。这些是参考份量，不是每日上限。餐馆汤品和炒菜的汤底或酱汁可能含较多钠。",
    summary: "普通份量可以；餐馆汤底和酱汁可能含较多钠。",
  },
  daikon: {
    name: "白萝卜（大根）",
    tip: "作为汤、炒菜或配菜的一般蔬菜份量通常是合理的起点。参考资料中的“萝卜”每 10 个列为 0 mg，但没有说明是白萝卜或对应的白萝卜份量，因此不能当作白萝卜的精确测量值。",
    summary: "可作为汤、炒菜或配菜的一般蔬菜份量。",
  },
  corn: {
    name: "玉米",
    tip: "一般份量通常适合许多结石预防饮食。参考资料列出半杯玉米含 1 mg 草酸；另需留意咸黄油或调味料。",
    summary: "一般份量可以；留意咸黄油或调味料。",
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
    summary: "钙盐点制的豆腐也算含钙食物，注意份量。",
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
  "char-siu-bao": {
    name: "叉烧包",
    tip: "一个包子可作为一餐的一部分。不同店家的甜咸猪肉馅做法不同，适量食用，并搭配蔬菜或白米饭。",
  },
  "egg-drop-soup": {
    name: "蛋花汤",
    tip: "少量作为配汤可以，但餐馆汤底可能偏咸。选择小份，将它作为配菜，而不是主要补水来源。",
  },
  "beef-broccoli": {
    name: "西兰花炒牛肉",
    tip: "可要求酱汁另放或少放，并与人分享牛肉。搭配米饭和额外的清淡西兰花，少选另一道咸菜。",
  },
  "lo-mein": {
    name: "捞面",
    tip: "外卖份量可能较大，酱油类调味汁也可能含较多钠。可分食或留一部分下餐，要求少放酱汁，并加不额外调味的蔬菜。",
  },
  "spring-rolls": {
    name: "蔬菜春卷",
    tip: "两只可作为配菜，但油炸外皮和蘸酱会增加摄入。可与人分享并少蘸酱；蒸蔬菜卷是较清淡的选择。",
  },
  "orange-chicken": {
    name: "橙味鸡",
    tip: "甜酱和裹粉会使这道菜含较多盐和糖。可少量与人分享，搭配米饭和蔬菜，而不要把它作为整餐唯一主菜。",
  },
  "garlic-eggplant": {
    name: "鱼香茄子",
    tip: "茄子本身是蔬菜，但酱汁可能偏咸，烹调时也可能吸收较多油。可要求少放酱汁，并搭配白米饭。",
  },
  "steamed-shrimp": {
    name: "蒜蓉蒸虾",
    tip: "适量虾通常可以。可要求蒜蓉和酱汁另放，因为酱油和蘸料可能增加较多钠。",
  },
  "hong-shao-rou": {
    name: "红烧肉",
    tip: "这道家常菜通常用五花肉、酱油和少量糖炖煮。肉和酱汁都较浓郁，建议少量食用，并搭配蔬菜和米饭。",
  },
  "yu-xiang-rou-si": {
    name: "鱼香肉丝",
    tip: "虽然名字有“鱼香”，这道川菜通常用猪肉而非鱼。泡椒、豆瓣酱和酱油可能使酱汁较咸；肉类适量，少加额外酱汁。",
  },
  "hui-guo-rou": {
    name: "回锅肉",
    tip: "这道川菜常用豆瓣酱调味。猪肉份量宜适中，可要求少放调料，并搭配清淡蔬菜或米饭。",
  },
  "hot-and-sour-soup": {
    name: "中式酸辣汤",
    tip: "做法各异，但餐馆汤底和酱油类调味可能偏咸。选择小碗；如有个人饮食限制，请询问具体食材。",
  },
  "di-san-xian": {
    name: "地三鲜",
    tip: "这是一道东北家常蔬菜菜式。蔬菜通常先过油再调味，可适量食用，并要求少油、少酱汁。",
  },
  "shou-si-bao-cai": {
    name: "手撕包菜",
    tip: "这道湘菜常用辣椒调味，有时也会加入腊肉。可要求少放盐；若想吃清淡蔬菜配菜，可不加腊肉。",
  },
  "tang-cu-li-ji": {
    name: "糖醋里脊",
    tip: "这道中式里脊菜不同于橙味鸡。糖醋芡汁可能含较多糖；建议少量搭配米饭和蔬菜，不额外加酱汁。",
  },
  "turkey-sandwich": {
    name: "火鸡三明治",
    tip: "熟食柜台火鸡肉可能已经含较多钠。可要求少放肉，选择芥末或蔬菜代替咸酱，并搭配水果或清淡配菜。",
  },
  "chicken-noodle-soup": {
    name: "鸡肉面汤",
    tip: "餐馆和罐装汤底可能含较多钠。可选低钠版本，并把鸡肉计入一餐的肉类份量。",
  },
  "teriyaki-salmon": {
    name: "照烧三文鱼",
    tip: "适量三文鱼可以作为一餐的鱼肉份量；照烧酱汁可能含较多钠和糖。可要求酱汁另放，少量使用。",
  },
  tempura: {
    name: "虾和蔬菜天妇罗",
    tip: "少量可作为一餐的一部分。蘸汁较咸，油炸面衣也容易让人吃多；可与人分享并少量蘸汁。",
  },
  yakisoba: {
    name: "猪肉炒面",
    tip: "调味酱可能让一整份外卖含钠较多。可分食或留一部分下餐，并加蔬菜而不是额外加酱。",
  },
  "chana-masala": {
    name: "鹰嘴豆咖喱",
    tip: "鹰嘴豆提供植物蛋白，一般份量通常可以。餐馆咖喱汁可能偏咸；可搭配米饭或饼，并少吃腌菜。",
  },
  "tandoori-chicken": {
    name: "坦都里烤鸡",
    tip: "选择适量鸡肉作为一餐的肉类份量。腌料和调味可能偏咸，可搭配白米饭和蔬菜，少吃腌菜。",
  },
  "vegetable-biryani": {
    name: "蔬菜香饭",
    tip: "米饭主食通常可以纳入一餐；餐馆调味和配菜可能增加钠。若需留意草酸，可询问是否含菠菜，并少吃咸腌菜。",
  },
  lasagna: {
    name: "千层面",
    tip: "餐馆份量可能较大且偏咸。可选小份并搭配蔬菜；菠菜馅版本的草酸会较高。",
  },
  "chicken-parmesan": {
    name: "帕尔马干酪鸡排",
    tip: "裹粉、奶酪和番茄酱可能让这道菜较咸。鸡肉适量，酱汁另放，并少选其他咸配菜。",
  },
  minestrone: {
    name: "意式蔬菜汤",
    tip: "豆类和蔬菜可以让汤更有饱腹感，但配方和钠含量不同。可询问是否含菠菜；如果汤底较咸，选择小碗。",
  },
  "caprese-salad": {
    name: "卡普雷塞沙拉",
    tip: "番茄和马苏里拉奶酪是简单的配菜，也含食物中的钙。可要求酱汁另放；额外盐和酱汁因店而异。",
  },
  "instant-tea": {
    name: "速溶甜茶",
    tip: "参考资料列出甜味速溶冰茶每杯草酸为 0 mg，而冲泡茶每杯为 14 mg。但添加糖仍需留意，日常更建议选择水或无糖茶。",
    summary: "草酸参考值低，但添加糖较多，日常更建议选择水或无糖茶。",
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
    (food.originalName && containsChineseText(food.originalName)
      ? food.originalName
      : food.aliases.find(containsChineseText) ?? food.name)
  );
}

export function foodDisplayNames(food: Food, isChinese: boolean): {
  primary: string;
  secondary?: string;
} {
  if (!isChinese) {
    return {
      primary: food.name,
      secondary: food.originalName && containsChineseText(food.originalName)
        ? food.originalName
        : undefined,
    };
  }

  const primary = chineseFoodName(food);
  return {
    primary,
    secondary: primary === food.name ? undefined : food.name,
  };
}

export function chineseFoodTip(food: Food): string {
  return foodTranslations[food.id]?.tip ?? "请按一般份量食用；若有个人饮食限制，请遵循医疗团队的建议。";
}

const conciseTips: Record<string, string> = {
  spinach: "Keep spinach portions small and pair them with a calcium food at the same meal.",
  celery: "A usual portion fits; restaurant soups and sauces can add sodium.",
  daikon: "A usual vegetable portion works in soup, stir-fry, or as a side.",
  corn: "A half-cup is a reference serving; watch salty butter and toppings.",
  tofu: "Calcium-set tofu can count as a calcium food; mind the portion.",
  "instant-tea": "The handout rates sweetened instant tea low for oxalate, but its added sugar still matters.",
};

function firstSentence(value: string): string {
  const end = value.search(/[.!?](?:\s|$)/);
  return end < 0 ? value : value.slice(0, end + 1);
}

export function foodSummary(food: Food, isChinese: boolean): string {
  if (isChinese) {
    const translated = foodTranslations[food.id];
    if (translated?.summary) return translated.summary;
    return firstSentence(translated?.tip ?? chineseFoodTip(food));
  }
  const tip = conciseTips[food.id] ?? firstSentence(food.tip);
  return /\b\d+(?:\.\d+)?\s*mg\b/i.test(tip)
    ? "Use a usual portion; see details for serving guidance."
    : tip;
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
