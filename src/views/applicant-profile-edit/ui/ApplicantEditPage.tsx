import { notFound } from "next/navigation";

import { getApplicantProfile } from "@/entities/applicant";
import { ProfileForm } from "@/features/update-applicant-profile";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function ApplicantEditPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const applicant = await getApplicantProfile(userId);

  if (!applicant) notFound();

  return <ProfileForm applicant={applicant} />;
}
