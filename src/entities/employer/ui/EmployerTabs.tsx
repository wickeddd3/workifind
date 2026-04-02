import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { EmployerDetails } from "./EmployerDetails";
import { EmployerPerks } from "./EmployerPerks";
import { Employer } from "../model/types";

export function EmployerTabs({ employer }: { employer: Employer }) {
  return (
    <Tabs defaultValue="about" className="w-full shadow-none">
      <TabsList className="w-full justify-start rounded-none border-b-2 border-gray-200 bg-white p-0 shadow-none">
        <TabsTrigger
          value="about"
          className="mr-8 rounded-none text-sm font-extrabold capitalize tracking-wider text-gray-400 shadow-none data-[state=active]:font-extrabold data-[state=active]:text-indigo-600 data-[state=active]:!shadow-none md:text-md"
        >
          About
        </TabsTrigger>
        <TabsTrigger
          value="culture"
          className="rounded-none text-sm font-extrabold capitalize tracking-wider text-gray-400 shadow-none data-[state=active]:font-extrabold data-[state=active]:text-indigo-600 data-[state=active]:!shadow-none md:text-md"
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
