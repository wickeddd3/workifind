import { Link as LinkIcon, Mail, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { DEFAULT_COMPANY_LOGO } from "@/shared/constants/logo";
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
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 md:h-20 md:w-20">
          <Image
            src={companyLogoUrl || DEFAULT_COMPANY_LOGO}
            alt={`${companyName} logo`}
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <NameHeading className="truncate text-lg font-bold text-gray-900 md:text-2xl">
            {companyName}
          </NameHeading>
          <div className="flex flex-col gap-1.5 text-sm text-gray-600 md:text-md">
            {companyWebsite && (
              <p className="flex items-center gap-2">
                <LinkIcon size={15} className="shrink-0" aria-hidden="true" />
                <a
                  href={`https://${companyWebsite}`}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-gray-700 transition-colors hover:text-indigo-600 hover:underline"
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
                  className="truncate text-gray-700 transition-colors hover:text-indigo-600 hover:underline"
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
