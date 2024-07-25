import { ArrowLeft } from "lucide-react";
import IconNoSelected from "@/components/icons/IconNoSelected";

export default function JobSelectedEmptyPlaceholder() {
  return (
    <section className="h-[100vh] w-full grow rounded-xl bg-gray-50 p-12">
      <div className="mx-auto w-full">
        <div className="flex space-x-4">
          <ArrowLeft size={26} />
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl font-medium">Select a job</h1>
            <h6 className="text-md text-gray-700">
              Job details will display here
            </h6>
          </div>
        </div>
        <div className="flex justify-center py-14 text-center">
          <IconNoSelected width={240} height={240} />
        </div>
      </div>
    </section>
  );
}
