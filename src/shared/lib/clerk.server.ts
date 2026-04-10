import { currentUser } from "@clerk/nextjs/server";

export async function getAuthUser() {
  const user = await currentUser();

  // Prioritize publicMetadata for security, fallback to unsafe for dev/onboarding
  const role = user?.publicMetadata?.role || user?.unsafeMetadata?.role;

  return {
    role: role as "EMPLOYER" | "APPLICANT" | undefined,
    userId: user?.id,
  };
}
