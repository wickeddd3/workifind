"use client";

import {
  Banknote,
  BookmarkMinus,
  Briefcase,
  EllipsisVertical,
  Fullscreen,
  MapPin,
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
import { useUser } from "@clerk/nextjs";
import { getJobSalary, hasJobSalary } from "@/entities/job";
import { type SavedJob } from "@/entities/saved-job";
import { unsaveJob } from "@/entities/saved-job/action";

export function SavedJobItem({
  savedJob: {
    id,
    job: { slug, title, employmentType, locationType, minSalary, maxSalary },
  },
}: {
  savedJob: SavedJob;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  const handleUnsaveJob = async (id: number) => {
    const deletedJob = await unsaveJob(id);
    if (deletedJob) {
      router.refresh();
      toast({
        title: "Job was successfully unsaved.",
      });
    }
  };

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
              {user && (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleUnsaveJob(id)}
                >
                  <BookmarkMinus className="mr-2 h-4 w-4" />
                  <span>Unsave</span>
                </DropdownMenuItem>
              )}
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
        {hasJobSalary(minSalary, maxSalary) && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 md:text-sm">
            <Banknote size={16} className="shrink-0" />
            {getJobSalary(minSalary, maxSalary)}
          </p>
        )}
      </div>
    </div>
  );
}
