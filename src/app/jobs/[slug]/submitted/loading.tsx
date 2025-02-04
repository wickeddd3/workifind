import JobApplicationSubmittedLoadingPlaceholder from "@/components/jobs/JobApplicationSubmittedLoadingPlaceholder";

export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="h-full">
        <JobApplicationSubmittedLoadingPlaceholder />
      </div>
    </main>
  );
}
