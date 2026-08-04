import { clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

/* -------------------------------------------------------------------------- */
/*  Config                                                                     */
/* -------------------------------------------------------------------------- */

// Sourced from env so the seed password isn't hard-coded in the repo; the
// fallback keeps local seeding working out of the box. Record counts are
// deterministic — driven by the JSON files in ./data.
export const SEED_PASSWORD =
  process.env.SEED_USER_PASSWORD ?? "73sT1NGP@ssw0rD!";

/* -------------------------------------------------------------------------- */
/*  Shared clients                                                             */
/* -------------------------------------------------------------------------- */

// One PrismaClient for the whole seed run (previously each service spun up its
// own, exhausting connections). Disconnected by the entry points.
export const prisma = new PrismaClient();

// Clerk v6 returns a promise from clerkClient(), so the client is resolved at
// each call site rather than once at module scope.

/* -------------------------------------------------------------------------- */
/*  Logger                                                                     */
/* -------------------------------------------------------------------------- */

export const logger = {
  start: (msg: string) => console.log(`\n🚀 ${msg}`),
  info: (msg: string) => console.log(`   ${msg}`),
  success: (msg: string) => console.log(`✅ ${msg}`),
  skip: (msg: string) => console.log(`⏩ ${msg}`),
  error: (msg: string, error?: unknown) =>
    console.error(`❌ ${msg}`, error ?? ""),
};

/* -------------------------------------------------------------------------- */
/*  Clerk helpers                                                              */
/* -------------------------------------------------------------------------- */

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Is this the API telling us to slow down rather than that we got it wrong? */
function isRateLimited(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    (error as { status?: number }).status === 429
  );
}

/**
 * How many times a rate-limited create is retried before giving up.
 *
 * This became necessary when the seed grew from ten users to a hundred and
 * fifty. Clerk rate-limits the Backend API, and the previous version treated a
 * 429 as a permanent failure: it logged, skipped the user, and carried on — so
 * a large seed quietly produced a database with holes in it, and the only sign
 * was a count that did not match at the end.
 */
const RATE_LIMIT_RETRIES = 5;

/** The account behind a seeded profile, and whether this run made it. */
export interface SeededUser {
  id: string;
  /** False when an existing Clerk account with this address was adopted. */
  created: boolean;
}

/**
 * Put the expected role on an adopted account, if it is not already there.
 *
 * Guarded rather than unconditional: this runs once per seeded person, and on a
 * re-seed the role is almost always already correct, so writing it anyway would
 * be sixty write calls into a rate limit for no change.
 */
async function syncRole(
  userId: string,
  current: Record<string, unknown>,
  expected: Record<string, unknown>,
) {
  if (current?.role === expected.role) return;

  try {
    const clerk = await clerkClient();
    await clerk.users.updateUser(userId, { publicMetadata: expected });
  } catch (error) {
    logger.error(`Clerk role update failed for ${userId}`, error);
  }
}

/** The Clerk account for this seed address, if the instance already has one. */
async function findClerkUserByEmail(emailAddress: string) {
  try {
    const clerk = await clerkClient();
    const { data } = await clerk.users.getUserList({
      emailAddress: [emailAddress],
      limit: 1,
    });

    return data[0] ?? null;
  } catch (error) {
    logger.error(`Clerk lookup failed for ${emailAddress}`, error);
    return null;
  }
}

/**
 * The Clerk account for a seed record — created, or adopted if it is already
 * there.
 *
 * Adoption is what lets one Clerk instance serve two databases. The seed
 * addresses are deterministic, so seeding a local database and a hosted one
 * produces profile rows whose `userId` points at the *same* Clerk account in
 * both. Signing in once then works against whichever database the app happens
 * to be pointed at, instead of the second seed run failing on every address
 * because Clerk already owns it — which is what happened before, leaving a
 * database with users in Clerk and no profile rows to match them.
 *
 * The role in `publicMetadata` is corrected on adoption. It decides what the
 * app lets the account do, and an account carrying APPLICANT while its profile
 * row is an Employer is a sign-in that lands on a 404.
 */
export async function ensureClerkUser(params: {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
  publicMetadata: Record<string, unknown>;
}): Promise<SeededUser | null> {
  for (let attempt = 0; attempt <= RATE_LIMIT_RETRIES; attempt++) {
    try {
      const clerk = await clerkClient();

      const user = await clerk.users.createUser({
        emailAddress: [params.emailAddress],
        password: params.password,
        firstName: params.firstName,
        lastName: params.lastName,
        publicMetadata: params.publicMetadata,
      });

      return { id: user.id, created: true };
    } catch (error) {
      if (isRateLimited(error) && attempt < RATE_LIMIT_RETRIES) {
        // Exponential backoff: 1s, 2s, 4s, 8s, 16s. Long enough to clear the
        // window without turning a 60-user seed into a coffee break.
        const wait = 1000 * 2 ** attempt;
        logger.skip(
          `Rate limited — waiting ${wait / 1000}s before retrying ${params.emailAddress}`,
        );
        await sleep(wait);
        continue;
      }

      // Any failure is worth one lookup rather than only the "address taken"
      // code: if the account is there, adopting it is the right answer whatever
      // the create actually objected to, and if it is not, we fall through to
      // the same error we would have reported anyway.
      const existing = await findClerkUserByEmail(params.emailAddress);

      if (existing) {
        await syncRole(
          existing.id,
          existing.publicMetadata,
          params.publicMetadata,
        );
        return { id: existing.id, created: false };
      }

      logger.error(`Clerk create failed for ${params.emailAddress}`, error);
      return null;
    }
  }

  return null;
}

export async function deleteClerkUser(userId: string): Promise<boolean> {
  for (let attempt = 0; attempt <= RATE_LIMIT_RETRIES; attempt++) {
    try {
      const clerk = await clerkClient();

      await clerk.users.deleteUser(userId);
      return true;
    } catch (error) {
      if (isRateLimited(error) && attempt < RATE_LIMIT_RETRIES) {
        await sleep(1000 * 2 ** attempt);
        continue;
      }

      // Worth retrying for the same reason creates are, and worth more: `clean`
      // refuses to touch the database while any deletion has failed, because
      // those rows are the only record of which Clerk users belong to the seed.
      logger.error(`Clerk delete failed for ${userId}`, error);
      return false;
    }
  }

  return false;
}
