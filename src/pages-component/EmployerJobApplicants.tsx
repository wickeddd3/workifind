import { notFound } from "next/navigation";
import { JobHeader, JobApplications, getJob } from "@/entities/job-application";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { JobDescription } from "@/entities/job";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function EmployerJobApplicants({ id }: { id: number }) {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const job = await getJob(id);

  if (!job) notFound();

  return (
    <section className="m-auto space-y-6 px-0 md:px-4">
      <JobHeader job={job} />
      <Tabs defaultValue="applicants" className="w-full shadow-none">
        <TabsList className="w-full justify-start rounded-none border-b-2 border-gray-200 bg-white p-0 shadow-none">
          <TabsTrigger
            value="description"
            className="mr-8 rounded-none text-sm font-extrabold capitalize tracking-wider text-gray-400 shadow-none data-[state=active]:font-extrabold data-[state=active]:text-indigo-600 data-[state=active]:!shadow-none md:text-md"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="applicants"
            className="rounded-none text-sm font-extrabold capitalize tracking-wider text-gray-400 shadow-none data-[state=active]:font-extrabold data-[state=active]:text-indigo-600 data-[state=active]:!shadow-none md:text-md"
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
