import { auth, currentUser } from "@clerk/nextjs/server";
import { cache } from "react";

import { logger } from "./logger";

export type UserRole = "EMPLOYER" | "APPLICANT";

/**
 * Resolve the signed-in user's id and role.
 *
 * Reads the role from the session token, which `auth()` returns from the
 * already-verified request JWT with no I/O. `currentUser()` — the previous
 * implementation — is an HTTP round trip to Clerk's Backend API on every call.
 *
 * `cache` still applies: a single render resolves the user from several places
 * (the navbar, the page body, widgets), and this keeps that to one resolution
 * per request even on the fast path.
 */
export const getAuthUser = cache(async () => {
  const { userId, sessionClaims } = auth();

  if (!userId) return { role: undefined, userId: undefined };

  // Present but empty means the claim is mapped and this user simply has no
  // role yet — someone who has not finished profile setup. Absent means the
  // instance is missing the session-token mapping, which is the only case
  // worth paying for a Backend API call to recover from.
  if (sessionClaims?.metadata !== undefined) {
    return { role: sessionClaims.metadata.role, userId };
  }

  logger.warn(
    "Session token has no `metadata` claim — falling back to the Clerk API. " +
      'Add {"metadata": "{{user.public_metadata}}"} under Configure → ' +
      "Sessions → Customize session token for this instance.",
  );

  const user = await currentUser();

  return {
    role: user?.publicMetadata?.role as UserRole | undefined,
    userId,
  };
});

/**
 * Assert the caller is authenticated and holds the required role.
 * Throws "Unauthorized" when not signed in, "Forbidden" on role mismatch.
 * Do NOT use this on onboarding/create-profile actions — the role is only
 * assigned after the profile is created.
 */
export async function requireRole(
  role: UserRole,
): Promise<{ userId: string; role: UserRole }> {
  const user = await getAuthUser();
  if (!user.userId) throw new Error("Unauthorized");
  if (user.role !== role) throw new Error("Forbidden");
  return { userId: user.userId, role };
}
