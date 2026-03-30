import { clerkClient } from "@clerk/nextjs/server";

const client = clerkClient();

export async function createClerkUser({
  emailAddress,
  password,
  firstName,
  lastName,
  publicMetadata,
}: {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
  publicMetadata: Record<string, any>;
}) {
  try {
    const user = await client.users.createUser({
      emailAddress: [emailAddress],
      password: password,
      firstName: firstName,
      lastName: lastName,
      publicMetadata,
    });

    return user;
  } catch (error) {
    console.error(`❌ Clerk Error for ${emailAddress}:`, error);
    return null;
  }
}
