import { getAuthUser } from "@/shared/lib/clerk.server";
import { notFound } from "next/navigation";
import { JobForm } from "@/features/job/create-job";
import { getEmployer } from "@/entities/employer/server";

export async function EmployerNewJobPage() {
  const { userId, role } = await getAuthUser();
  const isEmployer = role === "EMPLOYER";

  if (!userId) return notFound();

  const employer = await getEmployer(userId);

  if (!employer) return notFound();

  return isEmployer && <JobForm userId={userId} employerId={employer.id} />;
}
