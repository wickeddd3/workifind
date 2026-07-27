import { JobResultsSkeleton } from "@/features/search-jobs";
import { JobDetailSkeleton } from "@/widgets/selected-job";

// Mirrors the two-panel layout in `JobsPage` so navigating into /jobs paints the
// real structure immediately rather than an empty screen.
export default function Loading() {
  return (
    <div className="m-auto mb-10 space-y-6">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-4 px-4 pt-6 lg:py-12">
        <div className="h-6 w-72 animate-pulse rounded bg-gray-100" />
        <div className="h-[104px] w-full animate-pulse rounded-2xl border border-gray-100 bg-white shadow-card lg:h-[76px]" />
      </div>
      <div className="m-auto flex h-full max-w-7xl gap-4 px-3 md:flex-row">
        <section className="h-full w-full md:w-2/5">
          <JobResultsSkeleton />
        </section>
        <section className="sticky top-4 hidden max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border border-gray-100 bg-background p-6 shadow-card md:block md:w-3/5">
          <JobDetailSkeleton />
        </section>
      </div>
    </div>
  );
}
