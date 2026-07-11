import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/shared/lib/utils";

export default forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>(function SimpleSelect({ className, ...props }, ref) {
  return (
    <div className="relative flex items-center">
      <select
        className={cn(
          "h-10 w-full cursor-pointer appearance-none truncate rounded-md border border-input bg-background py-2 pl-3 pr-8 text-sm shadow-sm ring-offset-background transition-colors hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      <ChevronDown className="absolute right-3 h-4 w-4 opacity-50" />
    </div>
  );
});
