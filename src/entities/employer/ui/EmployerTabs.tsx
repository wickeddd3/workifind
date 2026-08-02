import type { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import type { Employer } from "../model/types";
import { EmployerDetails } from "./EmployerDetails";
import { EmployerPerks } from "./EmployerPerks";

// One copy rather than one per trigger — the third tab is what turned a long
// duplicated string into a place for the three to drift apart.
const TRIGGER_CLASS =
  "-mb-px rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-semibold text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:!shadow-none md:text-md";

export function EmployerTabs({
  employer,
  openJobs,
}: {
  employer: Employer;
  /**
   * The company's open roles, rendered by the caller.
   *
   * A slot rather than a query: which roles count as open is the job slice's
   * business, and entities are siblings that may not import each other. The
   * tab is omitted entirely when nothing is passed.
   */
  openJobs?: ReactNode;
}) {
  return (
    <Tabs defaultValue="about" className="w-full shadow-none">
      <TabsList className="w-full justify-start gap-8 rounded-none border-b border-border bg-transparent p-0 shadow-none">
        <TabsTrigger value="about" className={TRIGGER_CLASS}>
          About
        </TabsTrigger>
        <TabsTrigger value="culture" className={TRIGGER_CLASS}>
          Life and culture
        </TabsTrigger>
        {openJobs && (
          <TabsTrigger value="jobs" className={TRIGGER_CLASS}>
            Open jobs
          </TabsTrigger>
        )}
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
      {openJobs && (
        <TabsContent value="jobs" className="py-6 md:py-12">
          {openJobs}
        </TabsContent>
      )}
    </Tabs>
  );
}
