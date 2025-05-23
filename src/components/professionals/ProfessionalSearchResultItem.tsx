import { Applicant } from "@prisma/client";
import { BadgeCheck, Briefcase, Mail, MapPin } from "lucide-react";

interface ProfessionalSearchResultItemProps {
  professional: Applicant;
}

export default function ProfessionalSearchResultItem({
  professional: {
    firstName,
    lastName,
    email,
    location,
    experienced,
    profession,
  },
}: ProfessionalSearchResultItemProps) {
  return (
    <article className="flex w-full cursor-pointer items-center space-x-4 rounded-md border border-gray-100 p-4 hover:bg-gray-50">
      <div className="flex w-full flex-col gap-2 md:w-fit">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-gray-900 md:text-md">{`${firstName} ${lastName}`}</h3>
          {experienced && <BadgeCheck size={16} className="shrink-0" />}
        </div>
        <div className="flex flex-col gap-1 text-muted-foreground">
          {profession && (
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              <span className="text-xs font-medium text-gray-500 md:text-sm">
                {profession}
              </span>
            </p>
          )}
          {email && (
            <p className="flex items-center gap-1.5">
              <Mail size={16} className="shrink-0" />
              <span className="text-xs text-gray-500 md:text-sm">{email}</span>
            </p>
          )}
          {location && (
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              <span className="text-xs text-gray-500 md:text-sm">
                {location}
              </span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
