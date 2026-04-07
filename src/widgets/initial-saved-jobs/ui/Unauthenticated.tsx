import IllustrationAuthentication from "@/shared/ui/illustrations/IllustrationAuthentication";

export function Unauthenticated() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-gray-50 px-4 py-8">
      <IllustrationAuthentication />
      <p className="text-center text-md font-normal text-muted-foreground">
        Sign in and start saving jobs that match your preferences
      </p>
    </div>
  );
}
