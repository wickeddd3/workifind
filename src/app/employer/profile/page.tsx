"use client";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { getEmployer } from "@/actions/employers";
import EmployerDetails from "@/components/employer/EmployerDetails";

export default function Page() {
  const { user } = useUser();
  const [employer, setEmployer] = useState(null);

  const handleGetEmployer = useCallback(
    async (id: number) => await getEmployer(id),
    [],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleGetEmployer(user.id).then(setEmployer);
    }
  }, [user, handleGetEmployer]);

  return employer && <EmployerDetails employer={employer} />;
}
