"use client";

import { Bookmark } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

import { toggleSaveJobAction } from "../api/saved-job.action";

export function SaveButton({
  jobId,
  applicantId,
  initialIsSaved,
}: {
  jobId: string;
  applicantId: string;
  initialIsSaved: boolean;
}) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async () => {
    // Optimistic Update
    const nextState = !isSaved;
    setIsSaved(nextState);

    startTransition(async () => {
      const response = await toggleSaveJobAction(applicantId, jobId, isSaved);

      // Rollback if server fails
      if (!response.success) {
        setIsSaved(!nextState);
      }
    });
  };

  useEffect(() => {
    setIsSaved(initialIsSaved);
  }, [initialIsSaved]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={handleToggle}
      aria-pressed={isSaved}
      className={cn(
        "w-fit gap-2 px-5",
        isSaved &&
          "border-primary/25 bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
      )}
    >
      <Bookmark
        size={16}
        className={cn("shrink-0", isSaved && "fill-current")}
        aria-hidden="true"
      />
      {isSaved ? "Saved" : "Save"}
    </Button>
  );
}
