import { getCompany } from "@/actions/companies";
import CompanyDetails from "@/components/companies/CompanyDetails";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const company = await getCompany(slug);

  return (
    <main className="mx-auto h-full max-w-4xl p-4">
      {company && <CompanyDetails company={company} />}
    </main>
  );
}
