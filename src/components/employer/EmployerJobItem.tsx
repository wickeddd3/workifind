"use client";

import { Job, JobApplication } from "@prisma/client";
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatMoney } from "@/utils/format-money";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useMemo } from "react";
import { deleteJob } from "@/app/_services/employer-jobs";

interface EmployerJobItemProps {
  job: Job & { jobApplications: JobApplication[] };
}

export default function EmployerJobItem({
  job: { id, slug, title, employmentType, locationType, jobApplications },
  job,
}: EmployerJobItemProps) {
  const router = useRouter();
  const { toast } = useToast();

  const salary = (job: Job) => {
    const { minSalary, maxSalary } = job;
    if (!minSalary && !maxSalary) {
      return null;
    }
    if (minSalary === maxSalary) {
      return formatMoney(minSalary);
    }
    return `${formatMoney(minSalary)} - ${formatMoney(maxSalary)}`;
  };

  const handleDeleteJob = async (job: Job) => {
    const { userId, id } = job;
    const deletedJob = await deleteJob(userId, id);
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
                onClick={() => handleDeleteJob(job)}
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
        {salary(job) && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 md:text-sm">
            <Banknote size={16} className="shrink-0" />
            {salary(job)}
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
