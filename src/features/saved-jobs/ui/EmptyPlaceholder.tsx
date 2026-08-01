import { Bookmark } from "lucide-react";

import { EmptyState } from "@/shared/ui/EmptyState";

export function EmptyPlaceholder({ message }: { message?: string }) {
  return (
    <EmptyState
      icon={Bookmark}
      title={message ?? "No saved jobs yet"}
      description="Bookmark jobs that catch your eye and revisit them here anytime."
      action={{ label: "Browse jobs", href: "/jobs" }}
    />
  );
}
