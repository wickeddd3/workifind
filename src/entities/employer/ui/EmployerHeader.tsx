import { Button } from "@/shared/ui/button";
import { Heading4 } from "@/shared/ui/typography/Typography";
import { Link as LinkIcon, Mail, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function EmployerHeader({
  companyName,
  companyEmail,
  companyWebsite,
  companyLogoUrl,
  hasEditButton = false,
}: {
  companyName: string;
  companyEmail?: string | null;
  companyWebsite?: string | null;
  companyLogoUrl?: string | null;
  hasEditButton?: boolean | null;
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
          <Heading4 className="font-bold">{companyName}</Heading4>
          {hasEditButton && (
            <Button
              size="icon"
              className="h-8 w-8 bg-indigo-600 hover:bg-indigo-700"
              asChild
            >
              <Link
                href="/employer/profile/edit"
                className="text-xs md:text-sm"
              >
                <Pencil size={16} />
              </Link>
            </Button>
          )}
        </div>
        {companyWebsite && (
          <h6 className="flex items-center gap-3">
            <LinkIcon size={16} className="shrink-0" />
            <a
              href={`https://${companyWebsite}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-normal text-gray-900 hover:underline md:text-md"
            >
              {companyWebsite}
            </a>
          </h6>
        )}
        {companyEmail && (
          <h6 className="flex items-center gap-3">
            <Mail size={16} className="shrink-0" />
            <a
              href={`mailto://${companyEmail}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-normal text-gray-900 hover:underline md:text-md"
            >
              {companyEmail}
            </a>
          </h6>
        )}
      </div>
    </div>
  );
}
