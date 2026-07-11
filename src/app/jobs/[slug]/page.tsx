import type { Metadata } from "next";

import { getJobBySlug } from "@/entities/job";
import { getJobSalary, hasJobSalary } from "@/entities/job/model/salary";
import { JobPage } from "@/pages-component/JobPage";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const job = await getJobBySlug(slug);

  if (!job) return { title: "Job not found" };

  const company = job.employer.companyName;
  const title = `${job.title} at ${company}`;
  const details = [job.employmentType, job.locationType, job.location]
    .filter(Boolean)
    .join(" · ");
  const salary = hasJobSalary(job.minSalary, job.maxSalary)
    ? ` · ${getJobSalary(job.minSalary, job.maxSalary)}`
    : "";
  const description = `${job.title} at ${company}. ${details}${salary}. Apply now on workifind.`;

  return {
    title,
    description,
    alternates: { canonical: `/jobs/${slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/jobs/${slug}`,
      images: ["/og-image.png"],
    },
  };
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <JobPage slug={slug} />;
}
