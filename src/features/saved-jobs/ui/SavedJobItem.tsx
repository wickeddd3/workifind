"use client";

import { Bookmark, BookmarkX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { JobCard } from "@/entities/job/client";
import { type SavedJob } from "@/entities/saved-job";
import { relativeDate } from "@/shared/utils/format-date";

import { unsaveJobAction } from "../api/saved-job.action";

/**
 * One saved job.
 *
 * The row is a link to the posting, and unsaving is a single button rather than
 * a menu — with two items, one of which was "View", the menu cost a click to
 * reach what the row itself can now do.
 *
 * The button is layered over the card rather than placed inside it: a button
 * nested in an anchor is invalid, so the anchor wraps only the card and the
 * card reserves the corner for it.
 */
export function SavedJobItem({
  savedJob: { job, createdAt },
}: {
  savedJob: SavedJob;
}) {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  async function handleUnsave() {
    setIsRemoving(true);
    const response = await unsaveJobAction(job.id);

    if (!response.success) {
      setIsRemoving(false);
      return;
    }

    // Refresh so the row actually leaves the list. It used to toast and stay,
    // which read as the unsave having failed.
    router.refresh();
  }

  return (
    <div className="relative">
      <Link
        href={`/jobs/${job.slug}`}
        className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <JobCard
          job={job}
          // Reserves the top-right corner for the button layered above, so a
          // long title truncates before it reaches it.
          action={<span className="block h-8 w-8" aria-hidden="true" />}
          note={
            <>
              <Bookmark size={14} className="shrink-0" aria-hidden="true" />
              Saved {relativeDate(createdAt)}
            </>
          }
        />
      </Link>

      <button
        type="button"
        onClick={handleUnsave}
        disabled={isRemoving}
        aria-label={`Remove ${job.title} from saved jobs`}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
      >
        <BookmarkX size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
