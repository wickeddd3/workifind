import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicantNewProfileForm from "@/components/setup/ApplicantNewProfileForm";
import EmployerNewProfileForm from "@/components/setup/EmployerNewProfileForm";

export default function ProfileSetup() {
  return (
    <main className="m-auto my-4 flex max-w-3xl flex-col gap-6 px-3 md:my-10">
      <div className="space-y-1">
        <h1 className="text-md font-bold text-gray-900 md:text-lg">
          Profile setup
        </h1>
        <h2 className="text-sm font-medium text-gray-900 md:text-md">
          Choose account type
        </h2>
        <p className="text-xs font-normal text-gray-900 md:text-sm">
          Choose how you want to use your acccount. Pick Employer or Applicant
          profile.
        </p>
      </div>
      <hr />
      <Tabs defaultValue="applicant" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value="applicant"
            className="w-full text-xs font-bold uppercase tracking-wider text-gray-900 md:text-sm"
          >
            Applicant
          </TabsTrigger>
          <span className="px-6 text-xs font-semibold tracking-tighter text-gray-900 md:text-sm">
            OR
          </span>
          <TabsTrigger
            value="employer"
            className="w-full text-xs font-bold uppercase tracking-wider text-gray-900 md:text-sm"
          >
            Employer
          </TabsTrigger>
        </TabsList>
        <TabsContent value="applicant">
          <ApplicantNewProfileForm />
        </TabsContent>
        <TabsContent value="employer">
          <EmployerNewProfileForm />
        </TabsContent>
      </Tabs>
    </main>
  );
}
