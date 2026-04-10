import { notFound } from "next/navigation";
import { getApplicant } from "@/entities/applicant";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ProfileForm } from "@/features/applicant/update-profile";

export async function ApplicantEditPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const applicant = await getApplicant(userId);

  if (!applicant) notFound();

  return <ProfileForm applicant={applicant} />;
}
