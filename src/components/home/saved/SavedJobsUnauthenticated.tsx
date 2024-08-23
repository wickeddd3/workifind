import IllustrationAuthentication from "@/components/illustrations/IllustrationAuthentication";
import { clerkSignInUrl } from "@/lib/clerk";

export default function SavedJobsUnauthenticated() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-gray-50 px-4 py-8">
      <IllustrationAuthentication />
      <p className="text-md text-center font-normal text-muted-foreground">
        <a href={clerkSignInUrl} className="font-semibold underline">
          Sign in
        </a>{" "}
        and start saving jobs that match your preferences
      </p>
    </div>
  );
}
