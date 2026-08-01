import { Briefcase } from "lucide-react";

import { EmptyState } from "@/shared/ui/EmptyState";

export function EmptyPlaceholder({ message }: { message?: string }) {
  return (
    <EmptyState
      icon={Briefcase}
      title={message ?? "No applications yet"}
      description="Find roles that fit and apply in just a couple of clicks."
      action={{ label: "Browse jobs", href: "/jobs" }}
    />
  );
}
