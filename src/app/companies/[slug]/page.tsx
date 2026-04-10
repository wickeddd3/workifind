import { CompanyPage } from "@/pages-component/CompanyPage";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <CompanyPage slug={slug} />;
}
