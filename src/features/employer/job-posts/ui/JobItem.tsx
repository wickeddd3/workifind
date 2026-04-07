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
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/shared/ui/use-toast";
import { useMemo } from "react";
import { getJobSalary, hasJobSalary, Job } from "@/entities/job";
import { deleteEmployerJob } from "../model/delete-job";

export function JobItem({
  job: {
    userId,
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
  job: Job;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDeleteJob = async (userId: string, id: number) => {
    const deletedJob = await deleteEmployerJob(userId, id);
    if (deletedJob) {
      router.refresh();
      toast({
        title: "Job was successfully deleted.",
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
    <div className="flex flex-col gap-2 rounded-lg bg-gray-50 px-4 py-2 hover:bg-gray-100">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold capitalize text-gray-900 md:text-md">
          {title}
        </h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="shrink-0">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <EllipsisVertical size={16} className="shrink-0" />
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
                onClick={() => handleDeleteJob(userId, id)}
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
      <div className="flex flex-col">
        {employmentType && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 md:text-sm">
            <Briefcase size={16} className="shrink-0" />
            {employmentType}
          </p>
        )}
        {locationType && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 md:text-sm">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
        )}
        {hasJobSalary(minSalary, maxSalary) && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 md:text-sm">
            <Banknote size={16} className="shrink-0" />
            {getJobSalary(minSalary, maxSalary)}
          </p>
        )}
        {jobApplications && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 md:text-sm">
            <Users size={16} className="shrink-0" />
            {totalApplicants}
          </p>
        )}
      </div>
    </div>
  );
}
