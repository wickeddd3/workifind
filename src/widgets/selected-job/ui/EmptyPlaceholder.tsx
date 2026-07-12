import { MousePointerClick } from "lucide-react";

export function EmptyPlaceholder() {
  return (
    <section className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <MousePointerClick size={30} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-900 lg:text-xl">
          Pick a job to preview
        </h2>
        <p className="mx-auto max-w-sm text-sm text-gray-600 lg:text-md">
          Select a job from the list to see the full details right here.
        </p>
      </div>
    </section>
  );
}
