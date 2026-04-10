import IllustrationJobSaved from "@/shared/ui/illustrations/IllustrationJobSaved";

export function EmptyPlaceholder({
  message = "Start saving jobs that match your preferences",
}: {
  message?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-gray-50 px-4 py-8">
      <IllustrationJobSaved />
      <h4 className="text-lg font-semibold">No saved jobs</h4>
      <p className="text-center text-md font-normal text-muted-foreground">
        {message}
      </p>
    </div>
  );
}
