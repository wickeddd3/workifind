import IllustrationCuriositySearch from "@/shared/ui/illustrations/IllustrationCuriositySearch";

export function EmptyPlaceholder() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-6 rounded-2xl bg-gray-50 px-4 py-8">
      <IllustrationCuriositySearch />
      <div className="flex flex-col items-center gap-1 text-center">
        <h4 className="text-lg font-semibold">
          No professionals match your search
        </h4>
        <p className="text-sm text-gray-600">
          Try a different profession or clear your search to see everyone.
        </p>
      </div>
    </div>
  );
}
