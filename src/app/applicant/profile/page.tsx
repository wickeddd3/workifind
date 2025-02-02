import ApplicantDetails from "@/components/applicant/ApplicantDetails";
import ApplicantDetailsLoadingPlaceholder from "@/components/applicant/ApplicantDetailsLoadingPlaceholder";
import { getApplicantProfileByUserId } from "@/app/_services/applicant";
import { cache, Suspense } from "react";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const handleFetchApplicantProfile = cache(async (userId: string) => {
  return await getApplicantProfileByUserId(userId);
});

export default async function Page() {
  const { userId } = auth();

  if (!userId) notFound();

  const applicant = await handleFetchApplicantProfile(userId);

  if (!applicant) notFound();

  return (
    applicant && (
      <Suspense fallback={<ApplicantDetailsLoadingPlaceholder />}>
        <ApplicantDetails applicant={applicant} />
      </Suspense>
    )
  );
}
