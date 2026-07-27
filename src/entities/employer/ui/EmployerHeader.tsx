import { Link as LinkIcon, Mail, Pencil } from "lucide-react";
import Link from "next/link";

import { Avatar } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

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
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <Avatar
          name={companyName}
          src={companyLogoUrl}
          size={72}
          className="rounded-2xl"
        />
        <div className="flex min-w-0 flex-col gap-2">
          <NameHeading className="truncate text-lg font-bold text-foreground md:text-2xl">
            {companyName}
          </NameHeading>
          <div className="flex flex-col gap-1.5 text-sm text-muted-foreground md:text-md">
            {companyWebsite && (
              <p className="flex items-center gap-2">
                <LinkIcon size={15} className="shrink-0" aria-hidden="true" />
                <a
                  href={`https://${companyWebsite}`}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-foreground transition-colors hover:text-primary hover:underline"
                >
                  {companyWebsite}
                </a>
              </p>
            )}
            {companyEmail && (
              <p className="flex items-center gap-2">
                <Mail size={15} className="shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${companyEmail}`}
                  rel="noreferrer"
                  className="truncate text-foreground transition-colors hover:text-primary hover:underline"
                >
                  {companyEmail}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
      {hasEditButton && (
        <Button size="icon" className="h-8 w-8 shrink-0" asChild>
          <Link href="/employer/profile/edit" aria-label="Edit company profile">
            <Pencil size={16} aria-hidden="true" />
          </Link>
        </Button>
      )}
    </div>
  );
}
