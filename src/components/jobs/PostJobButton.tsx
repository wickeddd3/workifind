"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { useUser } from "@clerk/nextjs";

export default function PostJobButton() {
  const { user, isSignedIn } = useUser();
  const role = useMemo(() => user?.unsafeMetadata.role || "", [user]);
  const isEmployer = useMemo(
    () => isSignedIn && role === "EMPLOYER",
    [isSignedIn, role],
  );

  return (
    isEmployer && (
      <Button
        asChild
        className="rounded-full bg-indigo-600 font-extrabold text-gray-50 hover:bg-indigo-700"
      >
        <Link href="/employer/jobs/new" className="text-xs md:text-sm">
          Post a job
        </Link>
      </Button>
    )
  );
}
