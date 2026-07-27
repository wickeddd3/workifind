import type { Metadata } from "next";

import { getJobBySlug } from "@/entities/job";
import { getJobSalary, hasJobSalary } from "@/entities/job/model/salary";
import { JobPage } from "@/pages-component/JobPage";
import prisma from "@/shared/lib/prisma";

// The app's main organic landing surface. Job content is identical for every
// visitor, so it is prerendered and refreshed hourly; the create/update/delete
// actions revalidate it so edits publish without waiting out the hour.
export const revalidate = 3600;

// Pre-render the recent set. Older slugs are rendered on first request and
// cached from then on.
export async function generateStaticParams() {
  try {
    const jobs = await prisma.job.findMany({
      where: { approved: true, closed: false },
      select: { slug: true },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return jobs.map(({ slug }) => ({ slug }));
  } catch {
    // The database may be unreachable at build time; fall back to rendering
    // every job on demand.
    return [];
  }
}

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
