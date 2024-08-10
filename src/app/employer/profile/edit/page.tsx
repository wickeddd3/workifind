"use client";

import { useCallback, useEffect, useState } from "react";
import EmployerEditProfile from "@/components/employer/EmployerEditProfile";
import { useUser } from "@/contexts/UserContext";
import { getEmployer } from "@/actions/employers";

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

  return employer && <EmployerEditProfile employer={employer} />;
}
