import { JobApplicationSubmittedLoadingPlaceholder } from "@/features/job/submitted-application";

export default function Loading() {
  return (
    <section className="mx-auto h-full max-w-4xl p-4">
      <JobApplicationSubmittedLoadingPlaceholder />
    </section>
  );
}
