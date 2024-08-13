"use client";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { getEmployerJobs } from "@/actions/jobs";
import EmployerJobs from "@/components/employer/EmployerJobs";

export default function Page() {
  const { user } = useUser();
  const [jobs, setJobs] = useState(null);

  const handleGetJobs = useCallback(
    async (id: number) => await getEmployerJobs(id),
    [],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleGetJobs(user.id).then(setJobs);
    }
  }, [user, handleGetJobs]);

  return jobs && <EmployerJobs jobs={jobs} />;
}
