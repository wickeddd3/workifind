import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApplicantNewProfileForm from "@/components/applicant/ApplicantNewProfileForm";
import EmployerNewProfileForm from "@/components/employer/EmployerNewProfileForm";

export default function Page() {
  return (
    <main className="m-auto my-10 max-w-3xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-lg font-bold">Profile setup</h1>
        <h2 className="text-md">Choose account type</h2>
        <p className="text-sm font-light">
          Choose how you want to use your acccount. Pick Employer or Applicant
          profile.
        </p>
      </div>
      <hr />
      <Tabs defaultValue="applicant" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="applicant" className="w-full uppercase font-bold tracking-wider">Applicant</TabsTrigger>
          <span className="text-sm font-semibold tracking-tighter px-6">OR</span>
          <TabsTrigger value="employer" className="w-full uppercase font-bold tracking-wider">Employer</TabsTrigger>
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
