import ViewMoreButton from "@/components/ViewMoreButton";

export default function HomeInitialSavedJobs() {
  const savedJobs = [
    {
      title: "Senior Frontend Developer | Work from Home",
      companyName: "Accenture Philippines",
    },
    {
      title: "Frontend Developer (Angular)",
      companyName: "Accenture Philippines",
    },
    {
      title: "Front End Web Developer | Hybrid | Night Shift",
      companyName: "Accenture Philippines",
    },
    {
      title: "Software Application Developer (Web)",
      companyName: "Accenture Philippines",
    },
    {
      title: "Software Engineer (Front-End)",
      companyName: "Accenture Philippines",
    },
    {
      title:
        "React Developer (ReactJS / React Native / Node.js) (WFH - Work From Home)",
      companyName: "Accenture Philippines",
    },
  ];
  return (
    <section className="w-full py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Saved jobs</h1>
        <div className="flex w-full flex-wrap justify-between gap-4">
          {savedJobs.map((job) => (
            <div
              key={job.title}
              className="flex h-[100px] w-full cursor-pointer flex-col justify-center rounded-xl border-2 border-gray-100 bg-white p-4 hover:bg-gray-50 md:w-[48%]"
            >
              <h2 className="truncate text-lg font-medium">{job.title}</h2>
              <h3 className="text-md truncate font-medium text-muted-foreground">
                {job.companyName}
              </h3>
            </div>
          ))}
        </div>
        <ViewMoreButton text="View all" route="" />
      </div>
      {/* <p>Sign in to manage your Applicant Profile, save searches and view your saved jobs.</p> */}
    </section>
  );
}
