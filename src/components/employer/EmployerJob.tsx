import { Applicant, Employer, Job, JobApplication } from "@prisma/client";
import Markdown from "@/components/Markdown";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import ApplyButton from "@/components/jobs/ApplyButton";
import SaveJobButton from "@/components/jobs/SaveJobButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EmployerJobApplications from "@/components/employer/EmployerJobApplications";

interface EmployerJobProps {
  job: Job & { employer: Employer } & {
    jobApplications: (JobApplication & { applicant: Applicant })[];
  };
}

export default function EmployerJob({
  job: {
    title,
    description,
    employmentType,
    locationType,
    location,
    minSalary,
    maxSalary,
    createdAt,
    jobApplications,
  },
  job,
}: EmployerJobProps) {
  const salary = () => {
    if (minSalary === maxSalary) {
      return formatMoney(minSalary);
    }
    return `${formatMoney(minSalary)} - ${formatMoney(maxSalary)}`;
  };

  return (
    <main className="m-auto space-y-6 px-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          <div className="flex flex-col gap-2 text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {employmentType}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {location}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {salary()}
            </p>
            <p className="flex items-center gap-1.5 text-sm">
              {relativeDate(createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ApplyButton job={job} />
            <SaveJobButton job={job} />
          </div>
        </div>
      </div>
      <Tabs defaultValue="applicants" className="w-full shadow-none">
        <TabsList className="w-full justify-start rounded-none border-b-2 border-gray-200 bg-white p-0 shadow-none">
          <TabsTrigger
            value="description"
            className="mr-8 rounded-none font-medium capitalize tracking-wider shadow-none data-[state=active]:font-bold data-[state=active]:text-[#3366FF] data-[state=active]:!shadow-none"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="applicants"
            className="rounded-none font-medium capitalize tracking-wider shadow-none data-[state=active]:font-bold data-[state=active]:text-[#3366FF] data-[state=active]:!shadow-none"
          >
            Applicants
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-6">
          <div>{description && <Markdown>{description}</Markdown>}</div>
        </TabsContent>
        <TabsContent value="applicants" className="py-6">
          <EmployerJobApplications jobApplications={jobApplications} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
