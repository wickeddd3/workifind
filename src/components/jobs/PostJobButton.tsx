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
      <Button asChild className="bg-[#3366FF] hover:bg-[#254EDB]">
        <Link href="/employer/jobs/new">Post a job</Link>
      </Button>
    )
  );
}
