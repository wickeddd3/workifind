"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

import { useUserRole } from "../model/use-user-role";

/**
 * Employer-only shortcut. The role check runs on the client so the navbar stays
 * statically renderable; `/employer/jobs/new` is still gated server-side.
 */
export function PostJobButton() {
  const { role } = useUserRole();

  if (role !== "EMPLOYER") return null;

  return (
    <Button asChild className="rounded-full font-semibold">
      <Link href="/employer/jobs/new" className="gap-1.5 text-xs md:text-sm">
        <Plus size={16} aria-hidden="true" />
        Post a job
      </Link>
    </Button>
  );
}
