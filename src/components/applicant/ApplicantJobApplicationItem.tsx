import { Job, JobApplication } from "@prisma/client";
import {
  Banknote,
  Briefcase,
  EllipsisVertical,
  Fullscreen,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatMoney } from "@/lib/utils";
import Link from "next/link";

interface ApplicantJobApplicationItemProps {
  jobApplication: JobApplication & { job: Job };
}

export default function ApplicantJobApplicationItem({
  jobApplication: {
    job: { slug, title, employmentType, locationType },
    job,
  },
}: ApplicantJobApplicationItemProps) {
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

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-gray-50 px-4 py-2 hover:bg-gray-100">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold capitalize text-gray-900 md:text-md">
          {title}
        </h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <EllipsisVertical size={16} className="shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <Link href={`/jobs/${slug}`} target="_blank">
                <DropdownMenuItem className="cursor-pointer">
                  <Fullscreen className="mr-2 h-4 w-4" />
                  <span>View</span>
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
      </div>
    </div>
  );
}
