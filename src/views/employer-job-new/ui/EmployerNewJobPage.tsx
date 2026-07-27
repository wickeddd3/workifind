import { notFound } from "next/navigation";

import { getEmployer } from "@/entities/employer";
import { JobForm } from "@/features/job/create-job";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function EmployerNewJobPage() {
  const { userId, role } = await getAuthUser();
  const isEmployer = role === "EMPLOYER";

  if (!userId) return notFound();

  const employer = await getEmployer(userId);

  if (!employer) return notFound();

  return isEmployer && <JobForm employerId={employer.id} />;
}
