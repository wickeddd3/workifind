import {
  buildJobApplicationData,
  FRESH_GRADUATE_PITCHES,
  PITCH_TEMPLATES,
} from "../data";
import { ROLES } from "../data/content/roles";
import { intBetween, pick, shuffle } from "../data/generate/random";
import { logger, prisma } from "../helpers";

/**
 * How many applications a job receives.
 *
 * Weighted rather than uniform, and the zeroes are doing real work: on a board
 * this size a good third of postings have nobody on them yet, so the employer's
 * empty applicants page stays reachable without deleting anything. The long
 * tail at the other end is what makes a busy job look busy.
 */
const APPLICATION_COUNTS = [0, 0, 0, 1, 1, 2, 2, 3, 4, 6];

/** Spacing between successive applications, so the list spans a few weeks. */
const APPLICATION_AGE_STEP_MS = 5 * 60 * 60 * 1000;

/** Job title -> the profession that would apply for it. */
const PROFESSION_BY_TITLE = new Map(
  ROLES.map((role) => [role.title, role.profession]),
);

/**
 * Professions that work in the same industries, for topping up a thin pool.
 *
 * There are thirty-five professions and — on a free Clerk instance — thirty
 * applicants, so most professions have exactly one person in them. Matching
 * strictly would cap every job at a single application and leave every
 * employer's applicants page showing one name.
 *
 * Adjacency keeps the top-ups plausible: an accountant turning up on a credit
 * analyst posting is what actually happens, whereas the earlier version of this
 * seeder, which fell back to the whole list, sent nurses to DevOps roles.
 */
const ADJACENT_PROFESSIONS = (() => {
  const industriesOf = new Map<string, Set<string>>();
  for (const role of ROLES) {
    const set = industriesOf.get(role.profession) ?? new Set<string>();
    role.industries.forEach((industry) => set.add(industry));
    industriesOf.set(role.profession, set);
  }

  // `Array.from` rather than spreading the Map: the seed compiles under the
  // app's tsconfig, whose target predates iterating a Map directly.
  const entries = Array.from(industriesOf.entries());
  const adjacency = new Map<string, string[]>();

  for (const [profession, industries] of entries) {
    adjacency.set(
      profession,
      entries
        .filter(
          ([other, otherIndustries]) =>
            other !== profession &&
            Array.from(otherIndustries).some((industry) =>
              industries.has(industry),
            ),
        )
        .map(([other]) => other),
    );
  }

  return adjacency;
})();

interface SeedApplicant {
  id: string;
  userId: string;
  profession: string;
  experienced: string;
  skills: { name: string; years: number | null }[];
}

/** Rough years of experience, from the skill the applicant has held longest. */
function yearsFor(applicant: SeedApplicant): number {
  const longest = applicant.skills.reduce(
    (most, skill) => Math.max(most, skill.years ?? 0),
    0,
  );

  return Math.max(1, longest);
}

function pitchFor(
  applicant: SeedApplicant,
  job: { title: string; companyName: string },
): string {
  const names = applicant.skills.map((skill) => skill.name);
  const context = {
    jobTitle: job.title,
    companyName: job.companyName,
    profession: applicant.profession,
    // The templates read two skills; a sparse profile still has to produce a
    // sentence rather than "and undefined".
    skills: names.length >= 2 ? names : [...names, "the fundamentals"],
  };

  return applicant.experienced === "No experience"
    ? pick(FRESH_GRADUATE_PITCHES)(context)
    : pick(PITCH_TEMPLATES)({ ...context, years: yearsFor(applicant) });
}

export async function seedJobApplications() {
  logger.start("Seeding job applications...");

  const [applicants, jobs, existing] = await Promise.all([
    prisma.applicant.findMany({
      select: {
        id: true,
        userId: true,
        profession: true,
        experienced: true,
        skills: {
          select: { name: true, years: true },
          orderBy: { position: "asc" },
        },
      },
      orderBy: { id: "asc" },
    }),
    prisma.job.findMany({
      select: {
        id: true,
        title: true,
        employer: { select: { companyName: true } },
      },
      orderBy: { id: "asc" },
    }),
    // Loaded once rather than queried per candidate application. At three
    // hundred jobs the previous per-application `findFirst` was several hundred
    // round trips whose only job, on a fresh database, was to find nothing.
    prisma.jobApplication.findMany({
      select: { jobId: true, applicantId: true },
    }),
  ]);

  if (applicants.length === 0 || jobs.length === 0) {
    logger.skip("No applicants or jobs to link — skipping applications.");
    return;
  }

  // Re-running the seed must not stack duplicate applications on a job, and
  // must leave any real ones already in the database alone.
  const taken = new Set(
    existing.map((row) => `${row.jobId}:${row.applicantId}`),
  );

  // Grouped by profession so a nurse does not apply for a DevOps opening. The
  // previous seeder rotated through applicants in id order and paired them with
  // whatever job came next, which made every applicants page read as nonsense.
  const byProfession = new Map<string, SeedApplicant[]>();
  for (const applicant of applicants) {
    const list = byProfession.get(applicant.profession) ?? [];
    list.push(applicant);
    byProfession.set(applicant.profession, list);
  }

  let created = 0;
  let skipped = 0;
  let cursor = 0;

  for (const job of jobs) {
    const profession = PROFESSION_BY_TITLE.get(job.title);
    const matched = profession ? byProfession.get(profession) ?? [] : [];

    // Exact matches first, then people from neighbouring professions, then —
    // only if both are somehow empty — anyone. Ordering the pool rather than
    // choosing between the three keeps the closest fits at the top of the
    // employer's list while still filling it.
    const adjacent = shuffle(
      (profession ? ADJACENT_PROFESSIONS.get(profession) ?? [] : []).flatMap(
        (other) => byProfession.get(other) ?? [],
      ),
    );
    const pool = [...shuffle(matched), ...adjacent];
    const candidates = pool.length > 0 ? pool : shuffle(applicants);

    const wanted = Math.min(pick(APPLICATION_COUNTS), candidates.length);
    if (wanted === 0) continue;

    for (const applicant of candidates.slice(0, wanted)) {
      const key = `${job.id}:${applicant.id}`;
      if (taken.has(key)) {
        skipped++;
        continue;
      }
      taken.add(key);

      // Spread backwards from now, jittered so applications do not arrive on a
      // perfectly even cadence.
      const createdAt = new Date(
        Date.now() -
          cursor * APPLICATION_AGE_STEP_MS -
          intBetween(0, 3_600_000),
      );
      cursor++;

      try {
        await prisma.jobApplication.create({
          data: buildJobApplicationData({
            userId: applicant.userId,
            applicantId: applicant.id,
            jobId: job.id,
            pitch: pitchFor(applicant, {
              title: job.title,
              companyName: job.employer.companyName,
            }),
            createdAt,
          }),
        });
        created++;
      } catch (error) {
        logger.error(`Application create failed for job ${job.id}`, error);
      }
    }
  }

  logger.success(
    `Job applications seeded: ${created} created, ${skipped} already present.`,
  );
}
