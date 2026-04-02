import {
  SearchField,
  SearchContent,
} from "@/features/applicant/search-professionals";

export async function ProfessionalSearchPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <main className="m-auto mb-10 flex h-full min-h-screen max-w-2xl flex-col gap-6 px-3">
      <SearchField query={searchParams.q} />
      <SearchContent searchParams={searchParams} />
    </main>
  );
}
