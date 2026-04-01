import ProfileSetup from "@/components/setup/ProfileSetup";
import { getAuthUser } from "@/shared/lib/clerk";

export default async function Page() {
  const { role } = await getAuthUser();

  if (!role) {
    return <ProfileSetup />;
  }
}
