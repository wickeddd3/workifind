import { currentUser } from "@clerk/nextjs/server";

export type UserRole = "EMPLOYER" | "APPLICANT";

export async function getAuthUser() {
  const user = await currentUser();

  // Prioritize publicMetadata for security, fallback to unsafe for dev/onboarding
  const role = user?.publicMetadata?.role || user?.unsafeMetadata?.role;

  return {
    role: role as UserRole | undefined,
    userId: user?.id,
  };
}

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
