import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import ProfileSetup from "@/app/setup/ProfileSetup";

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

  if (!user) {
    return <ProfileSetup />;
  }
}
