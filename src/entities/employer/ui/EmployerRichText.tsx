import Markdown from "@/shared/ui/Markdown";

/**
 * A markdown body written by the employer — the About and the pitch.
 *
 * One component for both so the two read at the same size wherever they are
 * shown; they used to carry the size classes at each call site.
 */
export function EmployerRichText({ children }: { children?: string | null }) {
  if (!children?.trim()) return null;

  return (
    <div className="text-sm md:text-md">
      <Markdown>{children}</Markdown>
    </div>
  );
}
