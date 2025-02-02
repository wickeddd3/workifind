import EmployerEditProfile from "@/components/employer/EmployerEditProfile";
import { getEmployerProfileByUserId } from "@/app/_services/employer";
import { cache } from "react";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const handleFetchEmployerProfile = cache(async (userId: string) => {
  return await getEmployerProfileByUserId(userId);
});

export default async function Page() {
  const { userId } = auth();

  if (!userId) notFound();

  const employer = await handleFetchEmployerProfile(userId);

  if (!employer) notFound();

  return employer && <EmployerEditProfile employer={employer} />;
}
