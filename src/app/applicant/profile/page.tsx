"use client";

import { useCallback, useEffect, useState } from "react";
import ApplicantDetails from "@/components/applicant/ApplicantDetails";
import { useUser } from "@/contexts/UserContext";
import { getApplicant } from "@/actions/applicants";
import ApplicantDetailsLoadingPlaceholder from "@/components/applicant/ApplicantDetailsLoadingPlaceholder";

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

  return applicant ? (
    <ApplicantDetails applicant={applicant} />
  ) : (
    <ApplicantDetailsLoadingPlaceholder />
  );
}
