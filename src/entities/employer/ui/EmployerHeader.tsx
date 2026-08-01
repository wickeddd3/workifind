import { Link as LinkIcon, Mail, Pencil } from "lucide-react";
import Link from "next/link";

import { Avatar } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

/**
 * Who the company is, at the top of both its own profile and its public page.
 *
 * Laid out like `ApplicantHeader`: no surface of its own — both pages place it
 * inside a card, and a panel within a card reads as a box inside a box — and
 * the contact facts wrap as one row rather than stacking, so the header stays a
 * band rather than a column.
 */
export function EmployerHeader({
  companyName,
  companyEmail,
  companyWebsite,
  companyLogoUrl,
  hasEditButton = false,
  as: NameHeading = "h2",
}: {
  companyName: string;
  companyEmail?: string | null;
  companyWebsite?: string | null;
  companyLogoUrl?: string | null;
  hasEditButton?: boolean | null;
  as?: "h1" | "h2";
}) {
  const hasContact = Boolean(companyWebsite || companyEmail);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar
            name={companyName}
            src={companyLogoUrl}
            size={64}
            className="shrink-0 rounded-2xl"
          />
          <NameHeading className="min-w-0 truncate text-lg font-bold text-foreground md:text-xl">
            {companyName}
          </NameHeading>
        </div>
        {hasEditButton && (
          <Button size="icon" className="h-8 w-8 shrink-0" asChild>
            <Link
              href="/employer/profile/edit"
              aria-label="Edit company profile"
            >
              <Pencil size={16} aria-hidden="true" />
            </Link>
          </Button>
        )}
      </div>
      {hasContact && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
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
      )}
    </div>
  );
}
