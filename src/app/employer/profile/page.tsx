import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import EmployerEditProfile from "@/app/employer/profile/EmployerEditProfile";

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

  const getEmployerProfile = cache(async (userId: number | undefined) => {
    return await prisma.employer.findUnique({
      where: { userId },
    });
  });

  const employer = await getEmployerProfile(user.id);

  if (!employer) return null;

  return <EmployerEditProfile employer={employer} />;
}
