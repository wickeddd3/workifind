import { Applicant, JobApplication } from "@prisma/client";
import { BadgeCheck, Briefcase, MapPin } from "lucide-react";
import { JobApplicationPitch } from "@/components/JobApplicationPitch";

interface EmployerJobApplicationItemProps {
  jobApplication: JobApplication & { applicant: Applicant };
}

export default function EmployerJobApplicationItem({
  jobApplication: {
    pitch,
    applicant: { firstName, lastName, experienced, profession, location },
  },
}: EmployerJobApplicationItemProps) {
  return (
    <div className="flex min-w-[250px] flex-col space-y-1 rounded-lg bg-gray-50 p-4 shadow-sm hover:bg-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold">{`${firstName} ${lastName}`}</h3>
        {experienced && <BadgeCheck size={16} className="shrink-0" />}
      </div>
      <div className="flex flex-col gap-1 text-muted-foreground">
        {profession && (
          <p className="flex items-center gap-1.5">
            <Briefcase size={16} className="shrink-0" />
            <span className="text-sm">{profession}</span>
          </p>
        )}
        {location && (
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            <span className="text-sm">{location}</span>
          </p>
        )}
      </div>
      <JobApplicationPitch title="Applicant pitch" pitch={pitch} />
    </div>
  );
}
