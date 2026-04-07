import { LoadingPlaceholder } from "@/features/job/apply-to-job";

export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="h-full">
        <LoadingPlaceholder />
      </div>
    </main>
  );
}
