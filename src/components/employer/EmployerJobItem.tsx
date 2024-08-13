import { Job } from "@prisma/client";
import {
  Banknote,
  Briefcase,
  EllipsisVertical,
  Fullscreen,
  MapPin,
  Pencil,
  Trash,
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
import { deleteJobPost } from "@/actions/jobs";

interface EmployerJobItemProps {
  job: Job;
}

export default function EmployerJobItem({
  job: { slug, title, employmentType, locationType },
  job,
}: EmployerJobItemProps) {
  const salary = (job: Job) => {
    const { salaryStart, salaryEnd } = job;
    if (!salaryStart && !salaryEnd) {
      return null;
    }
    if (salaryStart === salaryEnd) {
      return formatMoney(salaryStart);
    }
    return `${formatMoney(salaryStart)} - ${formatMoney(salaryEnd)}`;
  };

  const handleDeleteJob = async (job: Job) => {
    const { authorId, slug } = job;
    await deleteJobPost(authorId, slug);
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-gray-50 px-4 py-2 hover:bg-gray-100">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-medium capitalize text-gray-900">
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
              <Link href={`/employer/jobs/${slug}`}>
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
              <Link href={`/jobs/${slug}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Fullscreen className="mr-2 h-4 w-4" />
                  <span>Preview</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col">
        {employmentType && (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Briefcase size={16} className="shrink-0" />
            {employmentType}
          </p>
        )}
        {locationType && (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
        )}
        {salary(job) && (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Banknote size={16} className="shrink-0" />
            {salary(job)}
          </p>
        )}
      </div>
    </div>
  );
}
