import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ProfileForm } from "@/features/employer/update-profile";
import { getEmployerProfile } from "@/entities/employer";

export async function EmployerEditPage() {
  const { userId } = auth();

  if (!userId) notFound();

  const employer = await getEmployerProfile(userId);

  if (!employer) notFound();

  return <ProfileForm employer={employer} />;
}
