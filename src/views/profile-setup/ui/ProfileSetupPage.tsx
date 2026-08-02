import { ProfileForm as NewApplicant } from "@/features/create-applicant-profile";
import { ProfileForm as NewEmployer } from "@/features/create-employer-profile";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export async function ProfileSetupPage() {
  const { role } = await getAuthUser();

  if (!role) {
    return (
      <div className="m-auto my-4 flex max-w-3xl flex-col gap-6 px-3 md:my-10">
        <div className="space-y-1">
          <h1 className="text-md font-bold text-foreground md:text-lg">
            Set up your profile
          </h1>
          <h2 className="text-sm font-medium text-foreground md:text-md">
            How will you use workifind?
          </h2>
          <p className="text-xs font-normal text-muted-foreground md:text-sm">
            Pick the profile that fits you — find work as an Applicant, or hire
            talent as an Employer.
          </p>
        </div>
        <hr />
        {/* `segmented` because this is a choice between two profiles, not
            navigation — the filled track is what says the two are exclusive.
            The "OR" that used to sit between the triggers is gone: a tablist
            may only contain tabs, and the segmented shape already carries what
            the word was there to say. */}
        <Tabs defaultValue="applicant" variant="segmented" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="applicant">Applicant</TabsTrigger>
            <TabsTrigger value="employer">Employer</TabsTrigger>
          </TabsList>
          <TabsContent value="applicant">
            <NewApplicant />
          </TabsContent>
          <TabsContent value="employer">
            <NewEmployer />
          </TabsContent>
        </Tabs>
      </div>
    );
  }
}
