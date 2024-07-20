import { Metadata } from "next";
import NewJobForm from "@/app/employer/jobs/new/NewJobForm";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default async function Page() {
  const { userId } = auth();

  const user = await prisma.user.findUnique({
    where: {
      authId: userId || "",
    },
  });

  return user && <NewJobForm userId={user.id} />;
}
