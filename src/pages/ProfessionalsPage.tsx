import { SearchJumbotron } from "@/widgets/search-jumbotron";
import { SuggestedProfessionals } from "@/widgets/professionals-carousel";
import { ProfessionalSearchTip } from "@/widgets/search-tip-section";
import { redirect } from "next/navigation";

async function searchProfessionals(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const q = values.q as string;
  const searchParams = new URLSearchParams({ ...(q && { q: q.trim() }) });

  redirect(`/professionals/search?${searchParams.toString()}`);
}

export async function ProfessionalsPage() {
  return (
    <main className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <SearchJumbotron
        title="Find your next potential hire"
        subtitle="Explore list of professionals you can hire"
        placeholder="Search by profession"
        searchAction={searchProfessionals}
      />
      <SuggestedProfessionals />
      <ProfessionalSearchTip />
    </main>
  );
}
