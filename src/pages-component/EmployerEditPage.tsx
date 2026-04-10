import { notFound } from "next/navigation";
import { getEmployer } from "@/entities/employer";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ProfileForm } from "@/features/employer/update-profile";

export async function EmployerEditPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const employer = await getEmployer(userId);

  if (!employer) notFound();

  return <ProfileForm employer={employer} />;
}
