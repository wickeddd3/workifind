import { clerkClient } from "@clerk/nextjs/server";

// `publicMetadata`, never `unsafeMetadata`: the latter is writable by the
// signed-in user from the browser, so storing an authorization role there lets
// anyone grant themselves any role. Only the backend can write this one.
export async function assignApplicantRole(userId: string) {
  // Clerk v6 returns a promise from clerkClient().
  const clerk = await clerkClient();

  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: { role: "APPLICANT" },
  });
}
