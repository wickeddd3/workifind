import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import ProfileSetup from "@/components/setup/ProfileSetup";
import EmployerProfile from "@/app/profile/EmployerProfile";
import ApplicantProfile from "@/app/profile/ApplicantProfile";
import { cache } from "react";

export default async function Page() {
  const { userId } = auth();

  const user = await prisma.user.findUnique({
    where: {
      authId: userId || "",
    },
    include: {
      employer: true,
      applicant: true,
    },
  });

  const getEmployerProfile = cache(async (userId: number | undefined) => {
    if (!userId) return null;

    return await prisma.employer.findUnique({
      where: { userId },
    });
  });

  if (!user) {
    return <ProfileSetup />;
  }

  if (user && user?.role === "EMPLOYER") {
    const employer = await getEmployerProfile(user.id);
    return employer && <EmployerProfile employer={employer} />;
  }

  if (user && user?.role === "APPLICANT") {
    return <ApplicantProfile />;
  }
}
