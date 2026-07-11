import type { Metadata } from "next";

import { CompaniesPage } from "@/pages-component/CompaniesPage";

export const metadata: Metadata = {
  title: "Explore companies",
  description:
    "Discover companies that are hiring, learn about their culture, and find your next employer on workifind.",
  alternates: { canonical: "/companies" },
};

export default async function Page() {
  return <CompaniesPage />;
}
