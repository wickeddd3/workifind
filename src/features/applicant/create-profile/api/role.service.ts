import { clerkClient } from "@clerk/nextjs/server";

export async function assignApplicantRole(userId: string) {
  await clerkClient().users.updateUserMetadata(userId, {
    unsafeMetadata: { role: "APPLICANT" },
  });
}
