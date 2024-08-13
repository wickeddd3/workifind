"use client";

import { getEmployerJob } from "@/actions/jobs";
import EditJobForm from "@/components/employer/EditJobForm";
import { useUser } from "@/contexts/UserContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useUser();
  const [job, setJob] = useState(null);
  const { slug } = useParams<{ id: string; slug: string }>();

  useEffect(() => {
    if (user && user?.id && slug) {
      getEmployerJob(user.id, slug).then(setJob);
    }
  }, [user, slug]);

  return job && user && <EditJobForm userId={user.id} slug={slug} job={job} />;
}
