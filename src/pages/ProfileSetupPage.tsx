import ProfileSetup from "@/components/setup/ProfileSetup";
import { getAuthUser } from "@/shared/lib/clerk";

export async function ProfileSetupPage() {
  const { role } = await getAuthUser();

  if (!role) {
    return <ProfileSetup />;
  }
}
