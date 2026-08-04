import { COMPANY_ROOTS, companySuffixes } from "../content/companies";
import {
  CERTIFICATIONS_BY_PROFESSION,
  DEGREES_BY_PROFESSION,
  FOREIGN_LANGUAGES,
  REGIONAL_LANGUAGES,
  SCHOOLS,
} from "../content/credentials";
import {
  HUB_LOCATIONS,
  LOCATIONS,
  type SeedLocation,
} from "../content/locations";
import { FIRST_NAMES, LAST_NAMES } from "../content/names";
import { ABOUT_TEMPLATES, FRESH_GRADUATE_ABOUTS } from "../content/prose";
import { PROFESSIONS, ROLES, rolesForProfession } from "../content/roles";
import type {
  ApplicantSeed,
  CertificationSeed,
  EducationSeed,
  ExperienceSeed,
  LanguageSeed,
  SkillSeed,
} from "../types";
import {
  chance,
  intBetween,
  mobileNumber,
  monthsAgo,
  pick,
  pickMany,
  pickWeighted,
} from "./random";
const AVAILABILITY = ["Now", "2 weeks", "4 weeks", "8 weeks", "12+ weeks"];

/** A plausible former employer — same name grammar as the seeded companies. */
function pastEmployer(industry: string): string {
  return `${pick(COMPANY_ROOTS)} ${pick(companySuffixes(industry))}`;
}

/** Level follows years, so nobody claims Expert after eight months. */
function levelFor(years: number): string {
  if (years >= 8) return pick(["Expert", "Advanced"]);
  if (years >= 4) return pick(["Advanced", "Intermediate"]);
  if (years >= 2) return "Intermediate";
  return pick(["Beginner", "Intermediate"]);
}

/** The best a given length of experience justifies, without the roll. */
function topLevelFor(years: number): string {
  if (years >= 8) return "Expert";
  if (years >= 4) return "Advanced";
  if (years >= 2) return "Intermediate";
  return "Beginner";
}

/**
 * The skills on the profile.
 *
 * Drawn from the roles this person's profession actually hires for, so the
 * skill list matches the jobs they will be shown against — which is the whole
 * point of having both in the same seed. A couple of adjacent skills are mixed
 * in, because nobody's real skill list is exactly their job description.
 */
function skillsFor(
  profession: string,
  totalYears: number,
  industry: string,
): SkillSeed[] {
  const core = Array.from(
    new Set(rolesForProfession(profession).flatMap((role) => role.skills)),
  );

  // Adjacent skills come from other roles in the same industry, not from the
  // whole catalogue. Drawn globally, this put "Facilities Compliance" on a
  // DevOps engineer's profile — which is not breadth, it is noise.
  const neighbours = ROLES.filter(
    (role) =>
      role.profession !== profession && role.industries.includes(industry),
  ).flatMap((role) => role.skills);

  // And only sometimes. Same-industry is a loose filter — a bank employs both
  // credit analysts and engineers — so drawing every time still put Docker on
  // enough finance CVs to notice. Roughly half of people have picked something
  // up from the team next door; the rest have not.
  const adjacent = chance(0.55)
    ? pickMany(
        neighbours.filter((skill) => !core.includes(skill)),
        intBetween(1, 2),
      )
    : [];

  // Both bounds are clamped to what the pool actually holds. A profession with
  // a single archetype behind it — an agriculturist, say — has four skills to
  // draw from, and asking for "between five and nine" of them is a crash
  // rather than a small list.
  const wanted = intBetween(Math.min(5, core.length), Math.min(9, core.length));
  const chosen = [...pickMany(core, wanted), ...adjacent];

  return chosen.map((name, index) => ({
    name,
    // The first one is what the About me names as their strength, so it takes
    // the top of the band outright rather than rolling for it — "6 years,
    // mostly SQL" beside SQL marked Intermediate reads as a contradiction.
    level:
      index === 0
        ? topLevelFor(totalYears)
        : levelFor(Math.max(1, totalYears - index)),
    years: Math.max(1, Math.min(totalYears, totalYears - index)),
  }));
}

/**
 * Languages, weighted the way this country speaks them.
 *
 * Filipino for everyone and English for nearly everyone, since both are
 * official and the second is the reason the BPO industry is here. The regional
 * language follows where the person lives, so a Cebu-based applicant lists
 * Cebuano rather than Kapampangan.
 */
function languagesFor(location: SeedLocation): LanguageSeed[] {
  const languages: LanguageSeed[] = [
    { name: "Filipino", proficiency: "Native" },
    {
      name: "English",
      proficiency: pick(["Fluent", "Professional", "Fluent"]),
    },
  ];

  const regional = REGIONAL_LANGUAGES[location.region];
  if (regional && regional !== "Tagalog") {
    languages.push({ name: regional, proficiency: pick(["Native", "Fluent"]) });
  }

  if (chance(0.18)) {
    languages.push({
      name: pick(FOREIGN_LANGUAGES),
      proficiency: pick(["Conversational", "Basic", "Professional"]),
    });
  }

  return languages;
}

/**
 * A work history that runs backwards from now without gaps or overlaps.
 *
 * Built newest-first and walked back month by month, because the profile page
 * sorts on these dates and a history where the second job ends after the third
 * one starts is the sort of thing that looks fine in JSON and obviously wrong
 * on screen.
 */
function experiencesFor(
  profession: string,
  industry: string,
  totalYears: number,
  location: SeedLocation,
): ExperienceSeed[] {
  const roles = rolesForProfession(profession);

  // Most senior first, because the list is built newest-first: a history that
  // ran Junior → Senior → Junior toward the present is a career going
  // backwards, which the shuffled version produced about half the time.
  const rank: Record<string, number> = { lead: 3, senior: 2, mid: 1, entry: 0 };
  const titles = [...roles]
    .sort((a, b) => rank[b.seniority] - rank[a.seniority])
    .map((role) => role.title);

  const experiences: ExperienceSeed[] = [];
  let monthsBack = 0;
  let remaining = totalYears * 12;
  let index = 0;

  // Never more stints than there are distinct titles to fill them, plus one.
  // A profession with a single archetype behind it was producing four
  // consecutive jobs with identical titles, which reads as a template rather
  // than as someone who moved companies.
  const maxStints = Math.min(4, titles.length + 1);

  while (remaining > 6 && index < maxStints) {
    const stint = Math.min(remaining, intBetween(14, 46));
    const isCurrent = index === 0;

    experiences.push({
      title: titles[index % titles.length],
      company: pastEmployer(industry),
      employmentType: "Full-time",
      location: location.name,
      startDate: monthsAgo(monthsBack + stint),
      endDate: isCurrent ? undefined : monthsAgo(monthsBack),
      current: isCurrent,
      description: pick([
        undefined,
        `Handled ${pick(roles).skills[0].toLowerCase()} for the team and trained two junior staff on it.`,
        `Owned this area end to end, from planning through to delivery and support.`,
        `Reported to the department head; covered for the team lead during their leave.`,
      ]),
    });

    monthsBack += stint + intBetween(0, 2);
    remaining -= stint;
    index++;
  }

  return experiences;
}

function educationFor(profession: string, totalYears: number): EducationSeed[] {
  const options = DEGREES_BY_PROFESSION[profession] ?? [
    { degree: "BS", field: "Business Administration" },
  ];
  const { degree, field } = pick(options);
  const school = pick(SCHOOLS);

  // Graduated roughly when they started working, allowing for a gap.
  const graduatedMonthsAgo = totalYears * 12 + intBetween(0, 10);

  // A minority of profiles leave the dates off entirely, which the profile page
  // has to render as gracefully as a complete one. Both or neither, rolled
  // once — rolling each date separately produced entries reading "2013 → ?",
  // which is not a person who skipped the dates, it is a broken record.
  const dated = chance(0.85);

  return [
    {
      school: school.name,
      degree,
      fieldOfStudy: field,
      startDate: dated ? monthsAgo(graduatedMonthsAgo + 48) : undefined,
      endDate: dated ? monthsAgo(graduatedMonthsAgo) : undefined,
      current: false,
      description: chance(0.2) ? "Graduated with Latin honours." : undefined,
    },
  ];
}

/** Issuers whose credentials a new graduate plausibly already holds. */
const ENTRY_LEVEL_ISSUERS = [
  "Professional Regulation Commission",
  "TESDA",
  "Civil Service Commission",
];

function certificationsFor(
  profession: string,
  totalYears: number,
  isFreshGraduate: boolean,
): CertificationSeed[] {
  let templates = CERTIFICATIONS_BY_PROFESSION[profession] ?? [];
  if (templates.length === 0) return [];

  // A new graduate has not held a Certified Kubernetes Administrator for three
  // years, and the first version of this seed gave them one. What they can
  // have is the licence or NC they sat for on leaving school — nurses,
  // teachers and engineers take their board exams immediately, and without the
  // licence they are not employable in the field at all.
  if (isFreshGraduate) {
    templates = templates.filter((template) =>
      ENTRY_LEVEL_ISSUERS.includes(template.issuer),
    );
    if (templates.length === 0 || !chance(0.7)) return [];

    return pickMany(templates, 1).map((template) => ({
      name: template.name,
      issuer: template.issuer,
      issueDate: monthsAgo(intBetween(2, 14)),
      expiryDate: template.expires ? monthsAgo(-36) : undefined,
      credentialId: chance(0.6)
        ? `${template.issuer.slice(0, 3).toUpperCase()}-${intBetween(100000, 999999)}`
        : undefined,
      credentialUrl: undefined,
    }));
  }

  // Licensed professions carry their licence almost always — it is what makes
  // them employable at all here. Everyone else has certifications sometimes.
  const licensed = templates.some(
    (template) => template.issuer === "Professional Regulation Commission",
  );
  const wanted = licensed
    ? intBetween(1, Math.min(2, templates.length))
    : chance(0.55)
      ? intBetween(1, Math.min(2, templates.length))
      : 0;

  return pickMany(templates, wanted).map((template) => {
    const issuedMonthsAgo = intBetween(6, Math.max(12, totalYears * 12));

    return {
      name: template.name,
      issuer: template.issuer,
      issueDate: monthsAgo(issuedMonthsAgo),
      expiryDate: template.expires
        ? monthsAgo(issuedMonthsAgo - 36)
        : undefined,
      credentialId: chance(0.6)
        ? `${template.issuer.slice(0, 3).toUpperCase()}-${intBetween(100000, 999999)}`
        : undefined,
      credentialUrl: undefined,
    };
  });
}

function emailFor(firstName: string, lastName: string, index: number): string {
  const local = `${firstName}.${lastName}`
    .toLowerCase()
    .replace(/[^a-z.]+/g, "");

  // `example.com` is reserved by RFC 2606 so a seed can never mail a real
  // person; the index keeps two Maria Santoses apart.
  return `${local}.a${index + 1}@example.com`;
}

/**
 * Build the applicants.
 *
 * The spread is deliberate rather than uniform: roughly one in eight has no
 * work history at all, so the profile page's empty states and the "No
 * experience" badge are exercised by the seed instead of only in theory.
 */
export function generateApplicants(count: number): ApplicantSeed[] {
  const applicants: ApplicantSeed[] = [];

  for (let index = 0; index < count; index++) {
    const profession = PROFESSIONS[index % PROFESSIONS.length];
    const professionRoles = rolesForProfession(profession);

    // A profession with no junior rung produces no fresh graduates. Nobody
    // leaves university into a DevOps Engineer role, and the first version of
    // this seed cheerfully created one asking for ₱85,000.
    const entryRoles = professionRoles.filter((r) => r.seniority === "entry");
    const isFreshGraduate = index % 8 === 3 && entryRoles.length > 0;

    const role = isFreshGraduate ? pick(entryRoles) : pick(professionRoles);
    const industry = role.industries[0];

    const location: SeedLocation = chance(0.6)
      ? pickWeighted(HUB_LOCATIONS)
      : pick(LOCATIONS);

    // Experience is bounded by what the role implies. Drawn freely, this
    // produced a DevOps engineer with one year behind them applying to a band
    // that starts at ₱85,000 — the profession only exists at senior level, so
    // its people have to.
    const YEARS_BY_SENIORITY: Record<string, [number, number]> = {
      entry: [0, 3],
      mid: [2, 8],
      senior: [5, 14],
      lead: [8, 18],
    };
    const [minYears, maxYears] = YEARS_BY_SENIORITY[role.seniority];
    const totalYears = isFreshGraduate
      ? 0
      : intBetween(Math.max(1, minYears), maxYears);

    const firstName = pick(FIRST_NAMES);
    const lastName = pick(LAST_NAMES);
    const skills = skillsFor(profession, Math.max(1, totalYears), industry);

    const skillNames = skills.map((skill) =>
      typeof skill === "string" ? skill : skill.name,
    );
    const headline: [string, string] = [
      skillNames[0] ?? profession,
      skillNames[1] ?? skillNames[0] ?? profession,
    ];

    const about = isFreshGraduate
      ? pick(FRESH_GRADUATE_ABOUTS)({
          profession,
          city: location.name,
          skills: headline,
        })
      : pick(ABOUT_TEMPLATES)({
          profession,
          years: totalYears,
          city: location.name,
          skills: headline,
        });

    // What the person is actually asking for: anchored on the role's band, and
    // placed within it by where they are in that band's own experience range
    // rather than against a flat fourteen years. Someone at the bottom of a
    // senior band asks below its floor, which is what people do.
    const [floor, ceiling] = role.salary;
    const progress = (totalYears - minYears) / Math.max(1, maxYears - minYears);
    const expectation = isFreshGraduate
      ? floor
      : Math.round((floor * 0.9 + (ceiling - floor * 0.9) * progress) / 1000) *
        1000;

    applicants.push({
      firstName,
      lastName,
      email: emailFor(firstName, lastName, index),
      phoneNumber: mobileNumber(),
      location: location.name,
      about,
      profession,
      experienced: isFreshGraduate ? "No experience" : "With experience",
      skills,
      languages: languagesFor(location),
      availability: isFreshGraduate ? "Now" : pickWeighted(AVAILABILITY),
      salaryExpectation: expectation,
      preferredLocations: Array.from(
        new Set([
          location.name,
          ...pickMany(HUB_LOCATIONS, intBetween(0, 2)).map((l) => l.name),
        ]),
      ),
      preferredEmploymentTypes: chance(0.85)
        ? ["Full-time"]
        : pickMany(["Full-time", "Part-time", "Contract"], intBetween(1, 2)),
      preferredLocationTypes: pickMany(
        ["Remote", "Hybrid", "On-site"],
        intBetween(1, 3),
      ),
      experiences: isFreshGraduate
        ? []
        : experiencesFor(profession, industry, totalYears, location),
      educations: educationFor(profession, Math.max(1, totalYears)),
      certifications: certificationsFor(
        profession,
        Math.max(1, totalYears),
        isFreshGraduate,
      ),
    });
  }

  return applicants;
}
