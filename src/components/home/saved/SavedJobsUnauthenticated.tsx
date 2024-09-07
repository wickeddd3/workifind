import IllustrationAuthentication from "@/components/illustrations/IllustrationAuthentication";

export default function SavedJobsUnauthenticated() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-gray-50 px-4 py-8">
      <IllustrationAuthentication />
      <p className="text-center text-md font-normal text-muted-foreground">
        Sign in and start saving jobs that match your preferences
      </p>
    </div>
  );
}
