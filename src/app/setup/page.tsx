import ProfileSetup from "@/components/setup/ProfileSetup";
import { getAuthUser } from "@/lib/clerk";

export default async function Page() {
  const { role } = await getAuthUser();

  if (!role) {
    return <ProfileSetup />;
  }
}
