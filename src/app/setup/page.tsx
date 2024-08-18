import ProfileSetup from "@/components/setup/ProfileSetup";
import { getUser } from "@/actions/user";

export default async function Page() {
  const user = await getUser();

  if (!user) {
    return <ProfileSetup />;
  }
}
