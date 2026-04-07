"use client";

import { Button } from "@/shared/ui/button";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { Job } from "@/entities/job";

export function ApplyButton({
  job,
  hasApplied,
}: {
  job: Job;
  hasApplied: boolean;
}) {
  if (!hasApplied) {
    return (
      <Button
        asChild
        className="w-fit bg-indigo-600 px-8 hover:bg-indigo-700"
        size="sm"
      >
        <Link href={`/jobs/${job.slug}/apply`}>Apply Now</Link>
      </Button>
    );
  }

  return (
    <span className="flex items-center gap-2 text-xs font-medium text-indigo-600 md:text-sm">
      <CircleCheckBig size={18} />
      Already Applied
    </span>
  );
}
