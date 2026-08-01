import { Users } from "lucide-react";

import { EmptyState } from "@/shared/ui/EmptyState";

/**
 * A job nobody has applied to yet.
 *
 * The page used to render nothing at all here, so an employer checking a quiet
 * post could not tell an empty list from a page that had failed to load.
 */
export function EmptyPlaceholder() {
  return (
    <EmptyState
      icon={Users}
      title="No applicants yet"
      description="Applications land here as they come in. Sharing the public posting is the quickest way to get the first one."
    />
  );
}
