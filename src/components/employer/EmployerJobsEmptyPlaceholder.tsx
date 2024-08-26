import IllustrationJobs from "@/components/illustrations/IllustrationJobs";

interface EmployerJobsEmptyPlaceholderProps {
  message?: string;
}

export default function EmployerJobsEmptyPlaceholder({
  message,
}: EmployerJobsEmptyPlaceholderProps) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-6 rounded-2xl bg-gray-50 px-4 py-8">
      <IllustrationJobs />
      <h4 className="text-lg font-semibold">{message}</h4>
    </div>
  );
}
