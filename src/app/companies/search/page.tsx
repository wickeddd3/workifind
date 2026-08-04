import type { Metadata } from "next";

import { CompanySearchPage } from "@/views/company-search";

export const metadata: Metadata = {
  title: "Search companies",
  description:
    "Search employers by name, industry, and location. See who is hiring right now on workifind.",
  alternates: { canonical: "/companies/search" },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <CompanySearchPage searchParams={searchParams} />;
}
