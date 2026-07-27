import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import type { Employer } from "../model/types";
import { EmployerDetails } from "./EmployerDetails";
import { EmployerPerks } from "./EmployerPerks";

export function EmployerTabs({ employer }: { employer: Employer }) {
  return (
    <Tabs defaultValue="about" className="w-full shadow-none">
      <TabsList className="w-full justify-start gap-8 rounded-none border-b border-border bg-transparent p-0 shadow-none">
        <TabsTrigger
          value="about"
          className="-mb-px rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-semibold text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:!shadow-none md:text-md"
        >
          About
        </TabsTrigger>
        <TabsTrigger
          value="culture"
          className="-mb-px rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-semibold text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:!shadow-none md:text-md"
        >
          Life and culture
        </TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="py-6 md:py-12">
        <EmployerDetails
          industry={employer.industry}
          location={employer.location}
          about={employer.about}
        />
      </TabsContent>
      <TabsContent value="culture" className="py-6 md:py-12">
        <EmployerPerks pitch={employer.pitch} perks={employer.perks} />
      </TabsContent>
    </Tabs>
  );
}
