import { getAuthUser } from "@/shared/lib/clerk";
import { notFound } from "next/navigation";
import { JobForm } from "@/features/job/create-job";
import { getEmployer } from "@/entities/employer";

export async function EmployerNewJobPage() {
  const { user, role } = await getAuthUser();
  const isEmployer = role === "EMPLOYER";

  if (!user) return notFound();

  const employer = await getEmployer(user.id);

  if (!employer) return notFound();

  return isEmployer && <JobForm userId={user.id} employerId={employer.id} />;
}
