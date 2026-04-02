import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getApplicantProfile } from "@/entities/applicant";
import { ProfileForm } from "@/features/applicant/update-profile";

export async function ApplicantEditPage() {
  const { userId } = auth();

  if (!userId) notFound();

  const applicant = await getApplicantProfile(userId);

  if (!applicant) notFound();

  return <ProfileForm applicant={applicant} />;
}
