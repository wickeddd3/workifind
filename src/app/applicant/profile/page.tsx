import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import ApplicantEditProfile from "@/app/applicant/profile/ApplicantEditProfile";

export default async function Page() {
  const { userId } = auth();

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: {
      authId: userId || "",
    },
    include: {
      employer: true,
      applicant: true,
    },
  });

  if (!user) return null;

  const getApplicantProfile = cache(async (userId: number | undefined) => {
    return await prisma.applicant.findUnique({
      where: { userId },
    });
  });

  const applicant = await getApplicantProfile(user.id);

  if (!applicant) return null;

  return <ApplicantEditProfile applicant={applicant} />;
}
