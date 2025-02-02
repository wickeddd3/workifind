import ProfileSetup from "@/components/setup/ProfileSetup";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  const role = user?.unsafeMetadata?.role;

  if (!role) {
    return <ProfileSetup />;
  }
}
