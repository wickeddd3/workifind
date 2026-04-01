import NewJobForm from "@/components/employer/NewJobForm";
import { getAuthUser } from "@/shared/lib/clerk";
import { notFound } from "next/navigation";

export default async function Page() {
  const { user, role } = await getAuthUser();
  const isEmployer = role === "EMPLOYER";

  if (!user) return notFound();

  return isEmployer && <NewJobForm userId={user.id} />;
}
