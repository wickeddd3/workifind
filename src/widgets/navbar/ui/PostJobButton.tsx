import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

export function PostJobButton() {
  return (
    <Button asChild className="rounded-full font-semibold">
      <Link href="/employer/jobs/new" className="gap-1.5 text-xs md:text-sm">
        <Plus size={16} aria-hidden="true" />
        Post a job
      </Link>
    </Button>
  );
}
