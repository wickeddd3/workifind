import { getAuthUser } from "@/shared/lib/clerk.server";

import { ProfileSetupFlow } from "./ProfileSetupFlow";

export async function ProfileSetupPage() {
  const { role } = await getAuthUser();

  // Setup is a one-time step. Once the account carries a role the profile
  // already exists and is edited from its own page, so there is nothing here.
  if (role) return null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 md:py-12">
      <ProfileSetupFlow />
    </div>
  );
}
