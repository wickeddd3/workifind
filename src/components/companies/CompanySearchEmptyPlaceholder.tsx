import IllustrationCuriositySearch from "@/components/illustrations/IllustrationCuriositySearch";

export default function CompanySearchEmptyPlaceholder() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-6 rounded-2xl bg-gray-50 px-4 py-8">
      <IllustrationCuriositySearch />
      <h4 className="text-lg font-semibold">No companies found</h4>
    </div>
  );
}
