import EmployerNewProfileForm from "@/components/employer/EmployerNewProfileForm";

export default function Page() {
  return (
    <main className="m-auto my-10 max-w-3xl space-y-5">
      <div className="space-y-1">
        <h1 className="text-lg font-bold">Profile setup</h1>
        <h2 className="text-md">Choose account type</h2>
        <p className="text-sm font-light">
          Choose how you want to use your acccount. Pick Employer or Applicant
          profile.
        </p>
      </div>
      <hr />
      <div className="space-y-6 rounded-lg border p-4">
        <div className="flex items-center justify-around">
          <div className="flex items-center gap-x-3">
            <input
              id="push-everything"
              name="push-notifications"
              type="radio"
              className="h-5 w-5 border-gray-300 cursor-pointer"
            />
            <label
              htmlFor="push-everything"
              className="block text-sm uppercase font-bold leading-6 text-gray-900 cursor-pointer"
            >
              Employer
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="push-email"
              name="push-notifications"
              type="radio"
              className="h-5 w-5 border-gray-300 cursor-pointer"
            />
            <label
              htmlFor="push-email"
              className="block text-sm uppercase font-bold leading-6 text-gray-900 cursor-pointer"
            >
              Applicant
            </label>
          </div>
        </div>
      </div>
      <EmployerNewProfileForm />
    </main>
  );
}
