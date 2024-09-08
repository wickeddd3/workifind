import { ArrowLeft } from "lucide-react";
import IconNoSelected from "@/components/icons/IconNoSelected";

export default function JobSelectedEmptyPlaceholder() {
  return (
    <section className="h-[100vh] w-full grow rounded-xl bg-gray-50 p-12">
      <div className="mx-auto w-full">
        <div className="flex gap-4">
          <div className="py-0 lg:py-1">
            <ArrowLeft size={24} />
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-lg font-medium text-gray-900 lg:text-xl">
              Select a job
            </h1>
            <h6 className="text-sm text-gray-700 lg:text-md">
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
