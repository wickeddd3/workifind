import { Pencil } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { SectionHeading } from "@/shared/ui/typography/Typography";

/**
 * One block of a profile, on either the owner's page or the public one.
 *
 * `id` matches the corresponding section on the edit page, so a completeness
 * prompt or an Edit link lands on the section that fills it.
 *
 * Empty sections behave differently depending on who is looking. To a visitor
 * they are simply absent — a stranger has no use for "no languages listed". To
 * the owner they stay, carrying the prompt to fill them, because a section that
 * disappears when empty is one the owner can never find their way into. That
 * asymmetry is the whole reason `editHref` decides it.
 *
 * It knows nothing about applicants or employers: both profiles are read as a
 * stack of these, and a second copy of the card was how the two drifted apart
 * in the first place.
 */
export function ProfileSection({
  id,
  title,
  editHref,
  isEmpty = false,
  emptyPrompt,
  children,
}: {
  id: string;
  title: string;
  editHref?: string;
  isEmpty?: boolean;
  emptyPrompt?: string;
  children: ReactNode;
}) {
  const isOwner = Boolean(editHref);

  if (isEmpty && !isOwner) return null;

  return (
    <section
      id={id}
      // Surface and padding are kept identical to `ProfileSectionCard` on the
      // edit page — see the note there.
      // Clears the sticky navbar when arrived at via an anchor.
      className="flex scroll-mt-24 flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionHeading>{title}</SectionHeading>
        {editHref && (
          <Link
            href={editHref}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Pencil size={13} aria-hidden="true" />
            Edit
            <span className="sr-only"> {title}</span>
          </Link>
        )}
      </div>

      <div>
        {isEmpty ? (
          <p className="text-sm text-muted-foreground">
            {emptyPrompt ?? "Nothing here yet."}
          </p>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
