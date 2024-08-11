"use client";

import { useCallback, useEffect, useState } from "react";
import ApplicantEditProfile from "@/components/applicant/ApplicantEditProfile";
import { useUser } from "@/contexts/UserContext";
import { getApplicant } from "@/actions/applicants";

export default function Page() {
  const { user } = useUser();
  const [applicant, setApplicant] = useState(null);

  const handleGetApplicant = useCallback(
    async (id: number) => await getApplicant(id),
    [],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleGetApplicant(user.id).then(setApplicant);
    }
  }, [user, handleGetApplicant]);

  return applicant && <ApplicantEditProfile applicant={applicant} />;
}
