/**
 * One-off backfill: move each user's role from `unsafeMetadata` to
 * `publicMetadata`.
 *
 * The role used to be written to `unsafeMetadata`, which the signed-in user can
 * write from the browser — meaning anyone could grant themselves any role. The
 * app now writes and reads `publicMetadata` only, so existing users need their
 * role copied across or they lose it.
 *
 * Run a dry run first (default), then apply:
 *
 *   npm run backfill:roles
 *   npm run backfill:roles -- --apply
 *
 * Safe to re-run: users already carrying a `publicMetadata.role` are skipped.
 */
// Re-exported by the declared `@clerk/nextjs` dependency, so this script does
// not reach into the transitive `@clerk/backend` package.
import { createClerkClient } from "@clerk/nextjs/server";

const VALID_ROLES = ["EMPLOYER", "APPLICANT"] as const;
type Role = (typeof VALID_ROLES)[number];

const PAGE_SIZE = 100;

const isApply = process.argv.includes("--apply");

// `--limit N` caps how many users are written, so the first apply can be
// verified against a single record before touching the rest.
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const applyLimit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;

function isRole(value: unknown): value is Role {
  return (
    typeof value === "string" && VALID_ROLES.includes(value as Role)
  );
}

async function main() {
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) throw new Error("CLERK_SECRET_KEY is not set");

  const clerk = createClerkClient({ secretKey });

  let offset = 0;
  let scanned = 0;
  const migrated: string[] = [];
  const skipped: string[] = [];
  const conflicted: string[] = [];
  const roleless: string[] = [];

  for (;;) {
    const { data: users } = await clerk.users.getUserList({
      limit: PAGE_SIZE,
      offset,
    });
    if (users.length === 0) break;

    for (const user of users) {
      scanned += 1;

      const publicRole = user.publicMetadata?.role;
      const unsafeRole = user.unsafeMetadata?.role;

      // Already migrated. Still clear a leftover unsafe value below if the two
      // disagree, since a stale self-asserted role is exactly what we're
      // removing.
      if (isRole(publicRole)) {
        if (unsafeRole !== undefined && unsafeRole !== publicRole) {
          conflicted.push(
            `${user.id} public=${publicRole} unsafe=${String(unsafeRole)}`,
          );
        }
        skipped.push(user.id);
        continue;
      }

      if (!isRole(unsafeRole)) {
        // Never completed profile setup — no role to carry over.
        roleless.push(user.id);
        continue;
      }

      migrated.push(`${user.id} -> ${unsafeRole}`);

      if (isApply && migrated.length <= applyLimit) {
        await clerk.users.updateUserMetadata(user.id, {
          publicMetadata: { ...user.publicMetadata, role: unsafeRole },
          // Drop the self-writable copy so it cannot drift back into use.
          // Clerk deletes a metadata key when its value is `null`; `undefined`
          // would be stripped by JSON serialization and silently leave it.
          unsafeMetadata: { ...user.unsafeMetadata, role: null },
        });
      }
    }

    offset += users.length;
    if (users.length < PAGE_SIZE) break;
  }

  console.log(isApply ? "\n=== APPLIED ===" : "\n=== DRY RUN (no writes) ===");
  console.log(`scanned:              ${scanned}`);
  console.log(`to migrate:           ${migrated.length}`);
  migrated.forEach((m) => console.log(`   ${m}`));
  console.log(`already public:       ${skipped.length}`);
  console.log(`no role at all:       ${roleless.length}`);

  if (conflicted.length > 0) {
    console.log(
      `\n!! ${conflicted.length} user(s) have a public role that disagrees with` +
        ` their unsafe role. The public value wins; review these:`,
    );
    conflicted.forEach((c) => console.log(`   ${c}`));
  }

  if (!isApply && migrated.length > 0) {
    console.log("\nRe-run with --apply to write these changes.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
