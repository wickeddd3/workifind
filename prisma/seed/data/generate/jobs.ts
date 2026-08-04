import {
  buildJobDescription,
  type RoleArchetype,
  rolesForIndustry,
} from "../content/roles";
import type { EmployerSeed, JobSeed } from "../types";
import { chance, intBetween, pick, shuffle } from "./random";

/**
 * How a role is worked, by what the role is.
 *
 * A civil engineer is not remote and a virtual assistant is not on site, so the
 * location type is decided from the work rather than rolled for. Getting this
 * wrong is the sort of detail that makes seeded data read as nonsense to
 * anyone who knows the industry.
 */
function locationTypeFor(role: RoleArchetype): string {
  const deskOnly = [
    "Civil Engineer",
    "Electrical Engineer",
    "Mechanical Engineer",
    "Registered Nurse",
    "Medical Technologist",
    "Teacher",
    "Hospitality Supervisor",
    "Agriculturist",
    "Safety Officer",
    "Architect",
    "Property Manager",
  ];

  if (deskOnly.includes(role.profession)) {
    return chance(0.85) ? "On-site" : "Hybrid";
  }

  const fullyRemote = [
    "Virtual Assistant",
    "Content Writer",
    "Frontend Developer",
  ];
  if (fullyRemote.includes(role.profession)) {
    return chance(0.6) ? "Remote" : "Hybrid";
  }

  // Everything else: the post-pandemic Philippine office split, which is mostly
  // hybrid with a meaningful on-site remainder.
  if (chance(0.4)) return "Hybrid";
  if (chance(0.5)) return "On-site";
  return "Remote";
}

function employmentTypeFor(role: RoleArchetype): string {
  // Overwhelmingly full-time, with a thin tail — which is what this market is.
  if (chance(0.86)) return "Full-time";
  if (role.seniority === "entry" && chance(0.4)) return "Internship";
  return pick(["Part-time", "Contract", "Temporary"]);
}

/**
 * The advertised band.
 *
 * Narrowed from the archetype's full range and nudged by the employer, so two
 * companies posting the same role do not advertise identical figures — and
 * rounded to thousands, because no job ad has ever said ₱47,318.
 */
function salaryFor(role: RoleArchetype): {
  minSalary: number;
  maxSalary: number;
} {
  const [floor, ceiling] = role.salary;
  const spread = ceiling - floor;

  const min = floor + intBetween(0, Math.floor(spread * 0.35));
  const max =
    min + intBetween(Math.floor(spread * 0.3), Math.floor(spread * 0.7));

  const round = (value: number) => Math.round(value / 1000) * 1000;

  return { minSalary: round(min), maxSalary: round(Math.min(max, ceiling)) };
}

/**
 * How many jobs each employer posts.
 *
 * Not an even split. A real board has a handful of employers carrying dozens of
 * openings and a long tail posting one or two, and an even spread would make
 * every company page look the same. Every employer gets at least one, so no
 * company profile is empty.
 */
function jobCountsFor(employerCount: number, total: number): number[] {
  const counts = new Array<number>(employerCount).fill(1);
  let remaining = total - employerCount;

  // The heavy hirers: the first fifth of the list takes a disproportionate
  // share, the way a few large employers dominate any real listing.
  for (let index = 0; index < employerCount && remaining > 0; index++) {
    const isHeavyHirer = index % 5 === 0;
    const take = Math.min(
      remaining,
      isHeavyHirer ? intBetween(6, 14) : intBetween(1, 5),
    );

    counts[index] += take;
    remaining -= take;
  }

  // Anything still unassigned goes round again rather than being dropped, so
  // the requested total is met exactly.
  let cursor = 0;
  while (remaining > 0) {
    counts[cursor % employerCount] += 1;
    remaining--;
    cursor++;
  }

  return counts;
}

/**
 * Build every employer's job list, aligned by index with the employers passed
 * in.
 *
 * Roles are drawn without replacement per employer where possible: a company
 * advertising the same title four times reads as a broken seed rather than a
 * busy company. Past the point where its industry runs out of distinct roles,
 * repeats are allowed but land in different locations and bands.
 */
export function generateJobsForEmployers(
  employers: EmployerSeed[],
  total: number,
): JobSeed[][] {
  const counts = jobCountsFor(employers.length, total);

  return employers.map((employer, index) => {
    const available = shuffle(rolesForIndustry(employer.industry));
    const wanted = counts[index];

    return Array.from({ length: wanted }, (_, n) => {
      const role = available[n % available.length];
      const locationType = locationTypeFor(role);
      const employmentType = employmentTypeFor(role);

      // A remote posting is listed as remote rather than as the head office,
      // matching how the location filter is meant to read.
      const location = locationType === "Remote" ? "Remote" : employer.location;

      return {
        title: role.title,
        employmentType,
        locationType,
        location,
        description: buildJobDescription({
          role,
          companyName: employer.companyName,
          location: employer.location,
          locationType,
          employmentType,
        }),
        profession: role.profession,
        ...salaryFor(role),
      };
    });
  });
}
