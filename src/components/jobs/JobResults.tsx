import JobItem from "@/components/jobs/JobItem";

export default function JobResults() {
  return <div className="w-2/5 space-y-4">
    {[1,2,3,4,5,6,7,8,9,10].map((n) => (
      <JobItem key={n} />
    ))}
  </div>;
}
