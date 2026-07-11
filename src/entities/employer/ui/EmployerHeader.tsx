import { Link as LinkIcon, Mail, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="flex flex-col gap-6">
      {companyLogoUrl && (
        <Image
          src={companyLogoUrl}
          alt={companyName}
          width={140}
          height={140}
          className="rounded-xl"
        />
      )}
      <div className="flex flex-col space-y-3">
        <div className="flex gap-4">
          <NameHeading className="text-md font-bold md:text-xl">
            {companyName}
          </NameHeading>
          {hasEditButton && (
            <Button
              size="icon"
              className="h-8 w-8 bg-indigo-600 hover:bg-indigo-700"
              asChild
            >
              <Link
                href="/employer/profile/edit"
                aria-label="Edit company profile"
                className="text-xs md:text-sm"
              >
                <Pencil size={16} aria-hidden="true" />
              </Link>
            </Button>
          )}
        </div>
        {companyWebsite && (
          <p className="flex items-center gap-3">
            <LinkIcon size={16} className="shrink-0" aria-hidden="true" />
            <a
              href={`https://${companyWebsite}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-normal text-gray-900 hover:underline md:text-md"
            >
              {companyWebsite}
            </a>
          </p>
        )}
        {companyEmail && (
          <p className="flex items-center gap-3">
            <Mail size={16} className="shrink-0" aria-hidden="true" />
            <a
              href={`mailto:${companyEmail}`}
              rel="noreferrer"
              className="text-sm font-normal text-gray-900 hover:underline md:text-md"
            >
              {companyEmail}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
