import { notFound } from "next/navigation";

import { EmployerHeader, EmployerTabs, getEmployer } from "@/entities/employer";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function EmployerPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const employer = await getEmployer(userId);

  if (!employer) notFound();

  return (
    <section className="mx-auto my-6 flex max-w-4xl flex-col space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
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
