import NewJobForm from "@/components/employer/NewJobForm";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  const role = user?.unsafeMetadata?.role;
  const isEmployer = role === "EMPLOYER";

  if (!user) return notFound();

  return isEmployer && <NewJobForm userId={user.id} />;
}
