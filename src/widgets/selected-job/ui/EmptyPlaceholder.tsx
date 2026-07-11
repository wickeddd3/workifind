import { ArrowLeft } from "lucide-react";

import IconNoSelected from "@/shared/ui/icons/IconNoSelected";

export function EmptyPlaceholder() {
  return (
    <section className="h-full min-h-[400px] w-full grow rounded-xl bg-gray-50 p-6 md:p-10">
      <div className="mx-auto w-full">
        <div className="flex gap-4">
          <div className="py-0 lg:py-1">
            <ArrowLeft size={24} />
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-lg font-medium text-gray-900 lg:text-xl">
              Pick a job to preview
            </h1>
            <p className="text-sm text-gray-600 lg:text-md">
              Select a job on the left to see the full details here.
            </p>
          </div>
        </div>
        <div className="flex justify-center py-14 text-center">
          <IconNoSelected width={240} height={240} />
        </div>
      </div>
    </section>
  );
}
