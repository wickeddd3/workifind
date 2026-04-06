import { getAuthUser } from "@/shared/lib/clerk";
import { notFound } from "next/navigation";
import { JobForm } from "@/features/job/create-job";

export async function EmployerNewJobPage() {
  const { user, role } = await getAuthUser();
  const isEmployer = role === "EMPLOYER";

  if (!user) return notFound();

  return isEmployer && <JobForm userId={user.id} />;
}
