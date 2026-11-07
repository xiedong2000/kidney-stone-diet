import type { Food } from "@/lib/model";

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function editDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  const current = new Array<number>(right.length + 1);

  for (let i = 1; i <= left.length; i += 1) {
    current[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + (left[i - 1] === right[j - 1] ? 0 : 1),
      );
    }
    for (let j = 0; j <= right.length; j += 1) previous[j] = current[j];
  }

  return previous[right.length];
}

function termScore(term: string, candidates: string[]): number | null {
  let best: number | null = null;
  const maxDistance = term.length >= 7 ? 2 : 1;

  for (const candidate of candidates) {
    if (candidate === term) {
      return 1000;
    }
    if (candidate.startsWith(term)) {
      best = Math.max(best ?? 0, 850 - (candidate.length - term.length));
      continue;
    }
    if (candidate.includes(term)) {
      best = Math.max(best ?? 0, 800 - (candidate.length - term.length));
      continue;
    }
    if (term.length < 5 || Math.abs(candidate.length - term.length) > maxDistance) {
      continue;
    }

    const distance = editDistance(term, candidate);
    if (distance <= maxDistance) {
      best = Math.max(best ?? 0, 600 - distance * 100 - Math.abs(candidate.length - term.length));
    }
  }

  return best;
}

export function foodSearchScore(food: Food, query: string): number | null {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const searchable = [
    food.name,
    food.originalName ?? "",
    food.cuisine,
    food.group,
    ...food.aliases,
  ].map(normalize).filter(Boolean);
  const candidates = searchable.flatMap((value) => value.split(" "));
  const terms = normalizedQuery.split(" ");
  const scores = terms.map((term) => termScore(term, candidates));

  if (scores.some((score) => score === null)) return null;

  const score = scores.reduce<number>((total, value) => total + (value ?? 0), 0);
  const nameCandidates = [food.name, food.originalName ?? ""]
    .map(normalize)
    .filter(Boolean)
    .flatMap((value) => value.split(" "));
  const nameScores = terms.map((term) => termScore(term, nameCandidates));
  const nameMatch = nameScores.every((value) => value !== null);
  const exactPhraseMatch = searchable.includes(normalizedQuery);
  const phraseMatch = searchable.some((value) => value.includes(normalizedQuery));

  return (
    score +
    (nameMatch ? 2000 : 0) +
    (exactPhraseMatch ? 10000 : phraseMatch ? 5000 : 0)
  );
}

export function splitFoodSearchTerms(query: string): string[] {
  return query.split(/[,;，、]+/).map((part) => part.trim()).filter(Boolean);
}

export function foodSearchScoreForTerms(food: Food, terms: string[]): number | null {
  const scores = terms
    .map((term) => foodSearchScore(food, term))
    .filter((score): score is number => score !== null);
  return scores.length > 0 ? Math.max(...scores) : null;
}

export function unmatchedFoodSearchTerms(query: string, candidates: Food[]): string[] {
  return splitFoodSearchTerms(query).filter(
    (term) => !candidates.some((food) => foodSearchScore(food, term) !== null),
  );
}
