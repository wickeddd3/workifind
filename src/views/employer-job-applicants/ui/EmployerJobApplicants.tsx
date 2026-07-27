import { notFound } from "next/navigation";

import { JobDescription } from "@/entities/job";
import { getJob, JobApplications, JobHeader } from "@/entities/job-application";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export async function EmployerJobApplicants({ id }: { id: number }) {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const job = await getJob(id);

  if (!job) notFound();

  return (
    <section className="m-auto my-6 max-w-4xl space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
      <JobHeader job={job} />
      <Tabs defaultValue="applicants" className="w-full shadow-none">
        <TabsList className="w-full justify-start gap-8 rounded-none border-b border-gray-200 bg-transparent p-0 shadow-none">
          <TabsTrigger
            value="description"
            className="-mb-px rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-semibold text-gray-500 shadow-none transition-colors hover:text-gray-800 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:!shadow-none md:text-md"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="applicants"
            className="-mb-px rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-semibold text-gray-500 shadow-none transition-colors hover:text-gray-800 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:!shadow-none md:text-md"
          >
            Applicants
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-6">
          <JobDescription description={job.description} />
        </TabsContent>
        <TabsContent value="applicants" className="py-6">
          <JobApplications jobApplications={job.jobApplications || []} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
