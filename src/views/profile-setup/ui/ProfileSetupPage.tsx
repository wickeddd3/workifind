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
        <Tabs defaultValue="applicant" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger
              value="applicant"
              className="w-full text-xs font-bold uppercase tracking-wider text-foreground md:text-sm"
            >
              Applicant
            </TabsTrigger>
            <span className="px-6 text-xs font-semibold tracking-tighter text-foreground md:text-sm">
              OR
            </span>
            <TabsTrigger
              value="employer"
              className="w-full text-xs font-bold uppercase tracking-wider text-foreground md:text-sm"
            >
              Employer
            </TabsTrigger>
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
