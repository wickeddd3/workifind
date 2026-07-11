import type { Metadata } from "next";

import { JobsPage } from "@/pages-component/JobsPage";

export const metadata: Metadata = {
  title: "Browse jobs",
  description:
    "Search thousands of open roles by title, employment type, salary, and location. Find your next job on workifind.",
  alternates: { canonical: "/jobs" },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <JobsPage searchParams={searchParams} />;
}
