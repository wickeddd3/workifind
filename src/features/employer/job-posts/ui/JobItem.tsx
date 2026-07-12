"use client";

import {
  Banknote,
  Briefcase,
  EllipsisVertical,
  Fullscreen,
  MapPin,
  Pencil,
  Trash,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { getJobSalary, hasJobSalary } from "@/entities/job/model/salary";
import { type EmployerJob } from "@/entities/job/model/types";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useToast } from "@/shared/ui/use-toast";

import { deleteJobAction } from "../api/job.action";

export function JobItem({
  job: {
    id,
    slug,
    title,
    employmentType,
    locationType,
    jobApplications,
    minSalary,
    maxSalary,
  },
}: {
  job: EmployerJob;
}) {
  const { toast } = useToast();

  const handleDeleteJob = async (id: number) => {
    const response = await deleteJobAction(id);

    if (response.success) {
      toast({
        title: "Job post removed",
      });
    }
  };

  const totalApplicants = useMemo(() => {
    if (jobApplications && jobApplications.length > 0) {
      return `${jobApplications.length} applicants`;
    }
    return "0 applicants";
  }, [jobApplications]);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-soft transition-all duration-200 hover:border-gray-200 hover:shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 truncate text-sm font-semibold text-gray-900 md:text-md">
          {title}
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="shrink-0">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              aria-label={`Actions for ${title}`}
            >
              <EllipsisVertical
                size={16}
                className="shrink-0"
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <Link href={`/employer/jobs/${id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleDeleteJob(id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
              <Link href={`/jobs/${slug}`} target="_blank">
                <DropdownMenuItem className="cursor-pointer">
                  <Fullscreen className="mr-2 h-4 w-4" />
                  <span>Public Preview</span>
                </DropdownMenuItem>
              </Link>
              <Link href={`/employer/jobs/${id}/applicants`} target="_blank">
                <DropdownMenuItem className="cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  <span>View Applicants</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 md:text-sm">
        {employmentType && (
          <span className="flex items-center gap-1">
            <Briefcase size={14} className="shrink-0" aria-hidden="true" />
            {employmentType}
          </span>
        )}
        {locationType && (
          <span className="flex items-center gap-1">
            <MapPin size={14} className="shrink-0" aria-hidden="true" />
            {locationType}
          </span>
        )}
        {hasJobSalary(minSalary, maxSalary) && (
          <span className="flex items-center gap-1">
            <Banknote size={14} className="shrink-0" aria-hidden="true" />
            {getJobSalary(minSalary, maxSalary)}
          </span>
        )}
        {jobApplications && (
          <span className="flex items-center gap-1 font-medium text-indigo-600">
            <Users size={14} className="shrink-0" aria-hidden="true" />
            {totalApplicants}
          </span>
        )}
      </div>
    </div>
  );
}
