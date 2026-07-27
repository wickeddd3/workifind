import { currentUser } from "@clerk/nextjs/server";
import { cache } from "react";

export type UserRole = "EMPLOYER" | "APPLICANT";

// `currentUser()` is a round trip to Clerk's Backend API, and a single render
// resolves the user several times over — the navbar, the page body, and widgets
// like InitialSavedJobs each ask independently. `cache` collapses those into one
// call per request.
export const getAuthUser = cache(async () => {
  const user = await currentUser();

  // `publicMetadata` only. Reading `unsafeMetadata` as a fallback would defeat
  // the point of writing the role to `publicMetadata`: a user can set their own
  // `unsafeMetadata` from the browser, so any role found there is self-asserted
  // and must never be trusted for authorization.
  const role = user?.publicMetadata?.role;

  return {
    role: role as UserRole | undefined,
    userId: user?.id,
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
