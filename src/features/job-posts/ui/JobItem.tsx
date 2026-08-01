"use client";

import {
  EllipsisVertical,
  Fullscreen,
  Pencil,
  Trash,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { type EmployerJob, JobCard } from "@/entities/job/client";
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

/**
 * One of the employer's own posts.
 *
 * Wraps the shared job card rather than restating it — the hand-rolled version
 * showed a title and three facts, with no logo, no company name and no posted
 * date, so the employer's list of a job looked nothing like the candidate's.
 *
 * The row links to that post's applicants: the count is the thing an employer
 * comes here to read, so it is also the thing the row opens. Editing, deleting
 * and previewing stay in the menu.
 */
export function JobItem({ job }: { job: EmployerJob }) {
  const router = useRouter();
  const { toast } = useToast();

  const applicantCount = job._count.jobApplications;

  async function handleDeleteJob() {
    const response = await deleteJobAction(job.id);

    if (!response.success) {
      toast({
        variant: "destructive",
        title: "Couldn't remove this post",
        description: "Something went wrong. Please try again.",
      });
      return;
    }

    toast({ title: "Job post removed" });
    // Refresh so the row actually leaves the list; it used to toast and stay,
    // which read as the delete having failed.
    router.refresh();
  }

  return (
    // The menu is layered over the card rather than placed inside it: a button
    // nested in an anchor is invalid, so the anchor wraps only the card and the
    // card reserves the corner for it.
    <div className="relative">
      <Link
        href={`/employer/jobs/${job.id}/applicants`}
        className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <JobCard
          job={job}
          // Reserves the top-right corner for the menu layered above, so a long
          // title truncates before it reaches it.
          action={<span className="block h-8 w-8" aria-hidden="true" />}
          note={
            <>
              <Users size={14} className="shrink-0" aria-hidden="true" />
              {applicantCount}{" "}
              {applicantCount === 1 ? "applicant" : "applicants"}
            </>
          }
        />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-4 z-10 h-8 w-8"
            aria-label={`Actions for ${job.title}`}
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
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/employer/jobs/${job.id}`}>
                <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/jobs/${job.slug}`} target="_blank">
                <Fullscreen className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Public preview</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={handleDeleteJob}
            >
              <Trash className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
