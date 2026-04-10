// import {
//   SearchField,
//   SearchContent,
// } from "@/features/employer/search-companies";

export async function CompanySearchPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <main className="m-auto mb-10 flex h-full min-h-screen max-w-2xl flex-col gap-6 px-3">
      {/* <SearchField query={searchParams.q} />
      <SearchContent searchParams={searchParams} /> */}
    </main>
  );
}
