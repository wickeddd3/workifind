import type { Applicant } from "@prisma/client";
import { BadgeCheck, Briefcase, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function ProfessionalCard({
  professional: {
    id,
    firstName,
    lastName,
    profession,
    email,
    location,
    experienced,
  },
}: {
  professional: Applicant;
}) {
  return (
    <Link href={`/professionals/${id}`}>
      <div className="flex h-[130px] min-w-[240px] flex-col space-y-1 rounded-xl border border-gray-100 bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-md font-semibold">{`${firstName} ${lastName}`}</h3>
          {experienced && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
              <BadgeCheck size={14} className="shrink-0" aria-hidden="true" />
              Verified
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 text-muted-foreground">
          {profession && (
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              <span className="text-sm">{profession}</span>
            </p>
          )}
          {email && (
            <p className="flex items-center gap-1.5">
              <Mail size={16} className="shrink-0" />
              <span className="text-sm">{email}</span>
            </p>
          )}
          {location && (
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              <span className="text-sm">{location}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
