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

const clerk = clerkClient();

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

export async function createClerkUser(params: {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
  publicMetadata: Record<string, unknown>;
}) {
  try {
    return await clerk.users.createUser({
      emailAddress: [params.emailAddress],
      password: params.password,
      firstName: params.firstName,
      lastName: params.lastName,
      publicMetadata: params.publicMetadata,
    });
  } catch (error) {
    logger.error(`Clerk create failed for ${params.emailAddress}`, error);
    return null;
  }
}

export async function deleteClerkUser(userId: string): Promise<boolean> {
  try {
    await clerk.users.deleteUser(userId);
    return true;
  } catch (error) {
    logger.error(`Clerk delete failed for ${userId}`, error);
    return false;
  }
}
