/**
 * Deterministic randomness.
 *
 * The seed has to produce the same records on every run: job and company slugs
 * are derived from names, they end up in URLs, and a re-seed that renamed
 * everything would break every link anyone had saved. Faker's own generator is
 * seedable, so the whole run is reproducible as long as the sequence of calls
 * does not change.
 *
 * The helpers here are thin on purpose — they exist so call sites read as what
 * they are choosing rather than as arithmetic on `faker.number.int`.
 */

import { faker } from "@faker-js/faker";

/** Any fixed value works; changing it reshuffles the entire seeded world. */
export const RANDOM_SEED = 20260804;

export function resetRandom(seed: number = RANDOM_SEED) {
  faker.seed(seed);
}

export function pick<T>(items: readonly T[]): T {
  return faker.helpers.arrayElement(items);
}

export function pickMany<T>(items: readonly T[], count: number): T[] {
  return faker.helpers.arrayElements(items, Math.min(count, items.length));
}

/** Inclusive on both ends. */
export function intBetween(min: number, max: number): number {
  return faker.number.int({ min, max });
}

/** True with the given probability, e.g. `chance(0.3)` for three in ten. */
export function chance(probability: number): boolean {
  return faker.number.float({ min: 0, max: 1 }) < probability;
}

/**
 * Pick with a bias toward the front of the list.
 *
 * Used where the real distribution is lopsided — most employers are in Metro
 * Manila, most applicants want full-time work — and a uniform pick would
 * produce a market that looks nothing like the one being modelled.
 */
export function pickWeighted<T>(items: readonly T[]): T {
  const skewed = Math.floor(
    Math.pow(faker.number.float({ min: 0, max: 1 }), 2) * items.length,
  );
  return items[Math.min(skewed, items.length - 1)];
}

export function shuffle<T>(items: readonly T[]): T[] {
  return faker.helpers.shuffle([...items]);
}

/** `YYYY-MM`, the format the CV date fields are seeded in. */
export function monthsAgo(months: number): string {
  const date = new Date();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() - months);

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

/**
 * A Philippine mobile number, in the format people actually write it.
 *
 * The prefixes are real network ranges, so the number looks right to anyone
 * from here; the subscriber digits are random, so none of them is a real
 * person's phone.
 */
const MOBILE_PREFIXES = [
  "917",
  "918",
  "919",
  "920",
  "921", // Globe
  "905",
  "906",
  "915",
  "916",
  "926", // Globe/TM
  "927",
  "935",
  "936",
  "937",
  "938", // Smart
  "939",
  "945",
  "946",
  "947",
  "949", // Smart/TNT
  "998",
  "999",
  "995",
  "996",
  "997", // Smart
];

export function mobileNumber(): string {
  const prefix = pick(MOBILE_PREFIXES);
  const subscriber = String(intBetween(0, 9999999)).padStart(7, "0");

  return `+63 ${prefix} ${subscriber.slice(0, 3)} ${subscriber.slice(3)}`;
}
