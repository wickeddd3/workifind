import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import {
  EmployerHeader,
  EmployerTabs,
  getEmployerProfile,
} from "@/entities/employer";

export async function EmployerPage() {
  const { userId } = auth();

  if (!userId) notFound();

  const employer = await getEmployerProfile(userId);

  if (!employer) notFound();

  return (
    <section className="flex flex-col space-y-6 px-4">
      <EmployerHeader
        companyName={employer.companyName}
        companyEmail={employer.companyEmail}
        companyWebsite={employer.companyWebsite}
        companyLogoUrl={employer.companyLogoUrl}
        hasEditButton={true}
      />
      <EmployerTabs employer={employer} />
    </section>
  );
}
