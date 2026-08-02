import type { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import type { Employer } from "../model/types";
import { EmployerDetails } from "./EmployerDetails";
import { EmployerPerks } from "./EmployerPerks";

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
  // `underline` because these navigate one company's sections rather than
  // offering a choice — the shape and its spacing come from the variant, so
  // there is nothing to restyle here.
  return (
    <Tabs defaultValue="about" variant="underline" className="w-full">
      <TabsList>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="culture">Life and culture</TabsTrigger>
        {openJobs && <TabsTrigger value="jobs">Open jobs</TabsTrigger>}
      </TabsList>
      <TabsContent value="about">
        <EmployerDetails
          industry={employer.industry}
          location={employer.location}
          about={employer.about}
        />
      </TabsContent>
      <TabsContent value="culture">
        <EmployerPerks pitch={employer.pitch} perks={employer.perks} />
      </TabsContent>
      {openJobs && <TabsContent value="jobs">{openJobs}</TabsContent>}
    </Tabs>
  );
}
