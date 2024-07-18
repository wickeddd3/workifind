import { Metadata } from "next";
import NewJobForm from "@/app/employer/jobs/new/NewJobForm";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default function Page() {
  return <NewJobForm />
}
