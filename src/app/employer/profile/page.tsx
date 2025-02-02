import EmployerDetails from "@/components/employer/EmployerDetails";
import EmployerDetailsLoadingPlaceholder from "@/components/employer/EmployerDetailsLoadingPlaceholder";
import { getEmployerProfileByUserId } from "@/app/_services/employer";
import { cache, Suspense } from "react";
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

  return (
    employer && (
      <Suspense fallback={<EmployerDetailsLoadingPlaceholder />}>
        <EmployerDetails employer={employer} />
      </Suspense>
    )
  );
}
