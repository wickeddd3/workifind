"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { useUser } from "@/contexts/UserContext";

export default function PostJobButton() {
  const { user } = useUser();
  const isEmployer = useMemo(() => user?.role === "EMPLOYER", [user]);

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
