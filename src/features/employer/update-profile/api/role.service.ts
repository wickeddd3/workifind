import { clerkClient } from "@clerk/nextjs/server";

export async function assignEmployerRole(userId: string) {
  await clerkClient().users.updateUserMetadata(userId, {
    unsafeMetadata: { role: "EMPLOYER" },
  });
}
