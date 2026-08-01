import { Briefcase } from "lucide-react";

import { EmptyState } from "@/shared/ui/EmptyState";

export function EmptyPlaceholder({ message }: { message?: string }) {
  return (
    <EmptyState
      icon={Briefcase}
      title={message ?? "No job posts yet"}
      description="Post a role to start receiving applications from candidates."
      action={{ label: "Post a job", href: "/employer/jobs/new" }}
    />
  );
}
