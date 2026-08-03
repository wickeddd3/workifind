import { Link as LinkIcon, Mail, Pencil } from "lucide-react";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";
import { Avatar } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

const EDIT_HREF = "/employer/profile/edit";

/**
 * Who the company is, at the top of both its own profile and its public page.
 *
 * Laid out like `ApplicantHeader`, down to the two orientations: no surface of
 * its own — both pages place it inside a card, and a panel within a card reads
 * as a box inside a box — and in `row` the contact facts wrap as one band
 * rather than stacking.
 */
export function EmployerHeader({
  companyName,
  companyEmail,
  companyWebsite,
  companyLogoUrl,
  hasEditButton = false,
  as: NameHeading = "h2",
  orientation = "row",
}: {
  companyName: string;
  companyEmail?: string | null;
  companyWebsite?: string | null;
  companyLogoUrl?: string | null;
  hasEditButton?: boolean | null;
  as?: "h1" | "h2";
  /**
   * `stacked` centres the logo over the company name and runs the contact
   * links down the card, for the owner's profile rail. A rail is too narrow
   * for the side-by-side arrangement: a real company name truncates to a word
   * and a domain never fits beside an email. The public company page keeps
   * `row`.
   */
  orientation?: "row" | "stacked";
}) {
  const isStacked = orientation === "stacked";
  const hasContact = Boolean(companyWebsite || companyEmail);

  const identity = (
    <div
      className={cn(
        "flex min-w-0 gap-4",
        isStacked ? "w-full flex-col items-center text-center" : "items-center",
      )}
    >
      <Avatar
        name={companyName}
        src={companyLogoUrl}
        size={64}
        className="shrink-0 rounded-2xl"
      />
      <NameHeading className="min-w-0 max-w-full truncate text-lg font-bold text-foreground md:text-xl">
        {companyName}
      </NameHeading>
    </div>
  );

  const contact = hasContact && (
    <div
      className={cn(
        "text-sm text-muted-foreground",
        isStacked
          ? "flex flex-col gap-2"
          : "flex flex-wrap items-center gap-x-4 gap-y-2",
      )}
    >
      {companyWebsite && (
        <span className="flex min-w-0 items-center gap-1.5">
          <LinkIcon size={15} className="shrink-0" aria-hidden="true" />
          <a
            href={`https://${companyWebsite}`}
            target="_blank"
            rel="noreferrer"
            className="truncate transition-colors hover:text-primary hover:underline"
          >
            {companyWebsite}
          </a>
        </span>
      )}
      {companyEmail && (
        <span className="flex min-w-0 items-center gap-1.5">
          <Mail size={15} className="shrink-0" aria-hidden="true" />
          <a
            href={`mailto:${companyEmail}`}
            rel="noreferrer"
            className="truncate transition-colors hover:text-primary hover:underline"
          >
            {companyEmail}
          </a>
        </span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {isStacked ? (
        identity
      ) : (
        <div className="flex items-start justify-between gap-4">
          {identity}
          {hasEditButton && (
            <Button size="icon" className="h-8 w-8 shrink-0" asChild>
              <Link href={EDIT_HREF} aria-label="Edit company profile">
                <Pencil size={16} aria-hidden="true" />
              </Link>
            </Button>
          )}
        </div>
      )}

      {contact}

      {/* Full width and labelled when stacked: the rail has the room, and an
          unlabelled icon in a corner is the first thing people miss when
          looking for how to edit their own profile. */}
      {isStacked && hasEditButton && (
        <Button className="w-full" asChild>
          <Link href={EDIT_HREF} className="gap-1.5">
            <Pencil size={16} aria-hidden="true" />
            Edit profile
          </Link>
        </Button>
      )}
    </div>
  );
}
