import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import ProfileSetup from "@/components/setup/ProfileSetup";
import EmployerProfile from "@/app/profile/EmployerProfile";
import ApplicantProfile from "@/app/profile/ApplicantProfile";

export default async function Page() {
  const { userId } = auth();

  const user = await prisma.user.findUnique({
    where: {
      authId: userId || ''
    },
    include: {
      employer: true,
      applicant: true,
    }
  });

  if(!user) {
    return <ProfileSetup />
  }

  if(user && user?.role === "EMPLOYER") {
    return <EmployerProfile />
  }

  if(user && user?.role === "APPLICANT") {
    return <ApplicantProfile />
  }
}
