import { SubmittedLoadingPlaceholder } from "@/entities/job-application";

export default function Loading() {
  return (
    <div className="mx-auto h-full max-w-4xl p-4">
      <SubmittedLoadingPlaceholder />
    </div>
  );
}
