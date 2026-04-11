import Link from "next/link";
import { Button } from "@/shared/ui/button";

export function PostJobButton() {
  return (
    <Button
      asChild
      className="rounded-full bg-indigo-600 font-extrabold text-gray-50 hover:bg-indigo-700"
    >
      <Link href="/employer/jobs/new" className="text-xs md:text-sm">
        Post a job
      </Link>
    </Button>
  );
}
