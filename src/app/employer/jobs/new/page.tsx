"use client";

import NewJobForm from "@/components/employer/NewJobForm";
import { useUser } from "@/contexts/UserContext";

export default function Page() {
  const { user } = useUser();

  return user && <NewJobForm userId={user.id} />;
}
