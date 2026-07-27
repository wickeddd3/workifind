import { ArrowRight, CircleCheckBig } from "lucide-react";
import Link from "next/link";

import type { Job } from "@/entities/job";
import { Button } from "@/shared/ui/button";

export function ApplyButton({
  job,
  hasApplied,
}: {
  job: Job;
  hasApplied: boolean;
}) {
  if (!hasApplied) {
    return (
      <Button asChild size="sm" className="w-fit gap-2 px-6">
        <Link href={`/jobs/${job.slug}/apply`}>
          Apply now
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </Button>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 md:text-sm">
      <CircleCheckBig size={16} aria-hidden="true" />
      Already applied
    </span>
  );
}
