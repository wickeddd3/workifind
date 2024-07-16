import JobItem from "@/components/jobs/JobItem";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function JobResults() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full space-y-4 md:w-2/5">
      {jobs.map((job) => (
        <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
          <JobItem job={job} />
        </Link>
      ))}
    </div>
  );
}
