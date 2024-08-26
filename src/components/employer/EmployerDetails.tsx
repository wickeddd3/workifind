import Image from "next/image";
import Markdown from "../Markdown";
import { Link as LinkIcon, Mail } from "lucide-react";
import Link from "next/link";
import { Employer } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface CompanyDetailsProps {
  employer: Employer & { perks: { name: string }[] };
}

export default function EmployerDetails({
  employer: {
    companyName,
    companyEmail,
    companyWebsite,
    companyLogoUrl,
    industry,
    location,
    about,
    pitch,
    perks,
  },
}: CompanyDetailsProps) {
  return (
    <section className="flex flex-col space-y-6 px-4">
      {companyLogoUrl && (
        <Image
          src={companyLogoUrl}
          alt={companyName}
          width={140}
          height={140}
          className="rounded-xl"
        />
      )}
      <div className="flex flex-col space-y-3">
        <h2 className="text-xl font-semibold">{companyName}</h2>
        {companyWebsite && (
          <h6 className="flex items-center gap-3">
            <LinkIcon size={16} className="shrink-0" />
            <Link
              href={companyWebsite}
              target="_blank"
              className="text-sm font-normal hover:underline"
            >
              {companyWebsite}
            </Link>
          </h6>
        )}
        {companyEmail && (
          <h6 className="flex items-center gap-3">
            <Mail size={16} className="shrink-0" />
            <Link
              href={companyEmail}
              target="_blank"
              className="text-sm font-normal hover:underline"
            >
              {companyEmail}
            </Link>
          </h6>
        )}
        <Button
          className="w-fit bg-[#3366FF] px-8 text-sm hover:bg-[#3366FF]"
          asChild
        >
          <Link href="/employer/profile/edit">Edit Profile</Link>
        </Button>
      </div>
      <Tabs defaultValue="about" className="w-full shadow-none">
        <TabsList className="w-full justify-start rounded-none border-b-2 border-gray-200 bg-white p-0 shadow-none">
          <TabsTrigger
            value="about"
            className="mr-8 rounded-none font-medium capitalize tracking-wider shadow-none data-[state=active]:font-bold data-[state=active]:text-[#3366FF] data-[state=active]:!shadow-none"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="culture"
            className="rounded-none font-medium capitalize tracking-wider shadow-none data-[state=active]:font-bold data-[state=active]:text-[#3366FF] data-[state=active]:!shadow-none"
          >
            Life and culture
          </TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="py-12">
          <div className="flex flex-col space-y-8">
            {(industry || location) && (
              <div className="flex flex-col space-y-4">
                <h1 className="text-lg font-medium">Company Overview</h1>
                {industry && (
                  <div className="flex items-center space-x-12">
                    <h3 className="text-md font-semibold">Industry</h3>
                    <p className="text-md">{industry}</p>
                  </div>
                )}
                {location && (
                  <div className="flex items-center space-x-12">
                    <h3 className="text-md font-semibold">Location</h3>
                    <p className="text-md">{location}</p>
                  </div>
                )}
              </div>
            )}
            {about && (
              <div className="flex flex-col space-y-4">
                <h1 className="text-xl font-medium">About us</h1>
                <div className="text-md">
                  {about && <Markdown>{about}</Markdown>}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="culture" className="py-12">
          <div className="flex flex-col space-y-8">
            {pitch && (
              <div className="flex flex-col space-y-4">
                <h1 className="text-lg font-medium">Why join us?</h1>
                <div className="text-md">
                  {pitch && <Markdown>{pitch}</Markdown>}
                </div>
              </div>
            )}
            {perks && perks.length > 0 && (
              <div className="flex flex-col space-y-4">
                <h1 className="text-lg font-medium">Perks</h1>
                <ul className="list-inside">
                  {perks.map((item, index) => (
                    <li key={`${item}-${index}`}>{item?.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
