import LoadingPlaceholder from "@/components/jobs/JobApplication/LoadingPlaceholder";

export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="h-full">
        <LoadingPlaceholder />
      </div>
    </main>
  );
}
