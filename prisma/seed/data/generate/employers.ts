import {
  buildAbout,
  COMPANY_ROOTS,
  companySuffixes,
  PERK_POOL,
} from "../content/companies";
import {
  HUB_LOCATIONS,
  LOCATIONS,
  type SeedLocation,
} from "../content/locations";
import { FIRST_NAMES, LAST_NAMES } from "../content/names";
import type { EmployerSeed } from "../types";
import { chance, intBetween, pick, pickMany, pickWeighted } from "./random";

/**
 * The industries employers are drawn from, in rough proportion to how much
 * hiring each carries in the Philippines.
 *
 * Repetition is the weighting: ICT and BPO appear several times because between
 * them they account for a large share of the formal job market here, and a
 * seeded board with one call-centre employer in fifty would not look like this
 * country's.
 */
const INDUSTRY_WEIGHTS = [
  "Information & Communication Technology",
  "Information & Communication Technology",
  "Information & Communication Technology",
  "Call Centre & Customer Service",
  "Call Centre & Customer Service",
  "Call Centre & Customer Service",
  "Banking & Financial Services",
  "Banking & Financial Services",
  "Accounting",
  "Construction",
  "Construction",
  "Healthcare & Medical",
  "Healthcare & Medical",
  "Sales",
  "Sales",
  "Marketing & Communications",
  "Engineering",
  "Education & Training",
  "Real Estate & Property",
  "Hospitality & Tourism",
  "Administration & Office Support",
  "Advertising, Arts & Media",
  "Design & Architecture",
  "Consulting & Strategy",
  "Trades & Services",
  "Science & Technology",
  "Farming, Animals & Conservation",
  "Community Services & Development",
  "CEO & General Management",
];

/** Turn a company name into the domain it would plausibly own. */
function websiteFor(companyName: string): string {
  const host = companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24);

  return `https://www.${host}.com.ph`;
}

/**
 * A contact email for the account that owns the company profile.
 *
 * `example.com` throughout: these addresses are handed to Clerk, which sends
 * mail to them. The domain is reserved by RFC 2606 precisely so that test
 * fixtures cannot deliver to a real person by accident.
 */
function emailFor(firstName: string, lastName: string, index: number): string {
  const local = `${firstName}.${lastName}`
    .toLowerCase()
    .replace(/[^a-z.]+/g, "");

  return `${local}.e${index + 1}@example.com`;
}

/**
 * Build the employers.
 *
 * Names are assembled rather than listed so that fifty of them do not need
 * fifty hand-written entries, and the used-name set stops two employers landing
 * on the same company name — which would otherwise produce two identical slugs
 * and a unique-constraint failure halfway through the run.
 */
export function generateEmployers(count: number): EmployerSeed[] {
  const employers: EmployerSeed[] = [];
  const usedNames = new Set<string>();

  for (let index = 0; index < count; index++) {
    const industry = INDUSTRY_WEIGHTS[index % INDUSTRY_WEIGHTS.length];

    // Most employers sit in a hub, because most employers do. The rest spread
    // across the regions so the location filter has something to filter.
    const location: SeedLocation = chance(0.65)
      ? pickWeighted(HUB_LOCATIONS)
      : pick(LOCATIONS);

    let companyName = "";
    for (let attempt = 0; attempt < 50; attempt++) {
      const candidate = `${pick(COMPANY_ROOTS)} ${pick(companySuffixes(industry))}`;
      if (!usedNames.has(candidate)) {
        companyName = candidate;
        break;
      }
    }
    // Exhausting fifty attempts means the name pool is genuinely used up;
    // falling back to the index keeps the run going with a unique name rather
    // than failing on a duplicate slug.
    if (!companyName) companyName = `${pick(COMPANY_ROOTS)} Group ${index + 1}`;
    usedNames.add(companyName);

    const firstName = pick(FIRST_NAMES);
    const lastName = pick(LAST_NAMES);
    const age = intBetween(2, 28);
    const headcount = pick([12, 25, 40, 60, 85, 120, 180, 250, 400, 650, 900]);

    employers.push({
      firstName,
      lastName,
      email: emailFor(firstName, lastName, index),
      companyName,
      companyWebsite: websiteFor(companyName),
      industry,
      location: location.name,
      about: buildAbout(
        { companyName, industry, location, age, headcount },
        pick,
      ),
      perks: pickMany(PERK_POOL, intBetween(4, 8)),
    });
  }

  return employers;
}
