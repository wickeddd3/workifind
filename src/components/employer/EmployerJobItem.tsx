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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface EmployerJobItemProps {
  job: Job;
}

export default function EmployerJobItem({
  job: { slug, title, employmentType, locationType },
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
    const { authorId, slug } = job;
    const deletedJob = await deleteJobPost(authorId, slug);
    if (deletedJob) {
      router.refresh();
      toast({
        title: "Job was successfully deleted.",
      });
    }
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
              <Link href={`/jobs/${slug}`} target="_blank">
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
