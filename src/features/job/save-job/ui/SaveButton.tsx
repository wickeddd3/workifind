"use client";

import { Button } from "@/shared/ui/button";
import { useEffect, useState, useTransition } from "react";
import { toggleSaveJob } from "@/entities/saved-job";

export function SaveButton({
  jobId,
  applicantId,
  userId,
  initialIsSaved,
}: {
  jobId: number;
  applicantId: number;
  userId: string;
  initialIsSaved: boolean;
}) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async () => {
    // Optimistic Update
    const nextState = !isSaved;
    setIsSaved(nextState);

    startTransition(async () => {
      const result = await toggleSaveJob(userId, applicantId, jobId, isSaved);

      // Rollback if server fails
      if (!result) {
        setIsSaved(!nextState);
      }
    });
  };

  useEffect(() => {
    setIsSaved(initialIsSaved);
  }, [initialIsSaved]);

  return (
    <Button
      disabled={isPending}
      onClick={handleToggle}
      className={`w-fit px-8 ${isSaved ? "bg-gray-200 text-black hover:bg-gray-300" : "bg-indigo-600 hover:bg-indigo-700"}`}
      size="sm"
    >
      {isSaved ? "Unsave" : "Save"}
    </Button>
  );
}
