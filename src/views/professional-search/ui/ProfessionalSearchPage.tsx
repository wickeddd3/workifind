import { notFound } from "next/navigation";

import { SearchContent, SearchField } from "@/features/search-professionals";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function ProfessionalSearchPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  // Same gate as the directory it searches — employers only.
  const { userId, role } = await getAuthUser();

  if (!userId || role !== "EMPLOYER") return notFound();

  return (
    <div className="m-auto mb-10 flex h-full min-h-screen max-w-2xl flex-col gap-6 px-3">
      <SearchField query={searchParams.q} />
      <SearchContent searchParams={searchParams} />
    </div>
  );
}
