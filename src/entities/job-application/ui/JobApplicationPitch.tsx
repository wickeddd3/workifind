"use client";

import { ChevronsUpDown, MessageSquare } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";

export function JobApplicationPitch({
  title = "Applicant pitch",
  pitch = "",
}: {
  title: string;
  pitch: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex w-fit items-center justify-between space-x-4">
        <h4 className="flex items-center gap-2 text-sm font-semibold">
          <MessageSquare size={18} />
          {title}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="w-full rounded-lg border border-gray-100 bg-gray-50 p-4">
        <div className="w-full whitespace-pre-wrap break-words text-sm text-gray-700">
          {pitch}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
