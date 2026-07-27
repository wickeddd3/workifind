import { notFound } from "next/navigation";

import { getApplicant } from "@/entities/applicant";
import { ProfileForm } from "@/features/applicant/update-profile";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function ApplicantEditPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const applicant = await getApplicant(userId);

  if (!applicant) notFound();

  return <ProfileForm applicant={applicant} />;
}
