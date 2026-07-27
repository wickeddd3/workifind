import { JobDetailSkeleton } from "@/widgets/selected-job";

// Matches the card wrapper in `JobPage` so the frame is stable while the job
// query resolves.
export default function Loading() {
  return (
    <section className="mx-3 my-6 h-full w-full max-w-4xl grow space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-card md:mx-auto md:p-8">
      <JobDetailSkeleton />
    </section>
  );
}
