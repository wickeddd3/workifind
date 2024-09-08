import Image from "next/image";
import Markdown from "../Markdown";
import { Link as LinkIcon, Mail } from "lucide-react";
import Link from "next/link";
import { Employer } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CompanyDetailsProps {
  company: Employer & { perks: { name: string }[] };
}

export default function CompanyDetails({
  company: {
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
    <section className="flex flex-col space-y-6">
      {companyLogoUrl && (
        <Image
          src={companyLogoUrl}
          alt={companyName}
          width={140}
          height={140}
          className="rounded-xl"
        />
      )}
      <div className="flex flex-col space-y-2">
        <h2 className="text-md font-bold text-gray-900 md:text-xl">
          {companyName}
        </h2>
        {companyWebsite && (
          <h6 className="flex items-center gap-3">
            <LinkIcon size={16} className="shrink-0" />
            <Link
              href={companyWebsite}
              target="_blank"
              className="text-sm font-normal text-gray-900 hover:underline md:text-md"
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
              className="text-sm font-normal text-gray-900 hover:underline md:text-md"
            >
              {companyEmail}
            </Link>
          </h6>
        )}
      </div>
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
          <div className="flex flex-col space-y-8">
            {(industry || location) && (
              <div className="flex flex-col space-y-4">
                <h1 className="text-md font-bold text-gray-800 md:text-lg">
                  Company Overview
                </h1>
                {industry && (
                  <div className="flex items-start space-x-12">
                    <h3 className="text-sm font-semibold text-gray-700 md:text-md">
                      Industry
                    </h3>
                    <p className="text-sm md:text-md">{industry}</p>
                  </div>
                )}
                {location && (
                  <div className="flex items-start space-x-12">
                    <h3 className="text-sm font-semibold text-gray-700 md:text-md">
                      Location
                    </h3>
                    <p className="text-sm md:text-md">{location}</p>
                  </div>
                )}
              </div>
            )}
            {about && (
              <div className="flex flex-col space-y-4">
                <h1 className="text-md font-bold text-gray-800 md:text-lg">
                  About us
                </h1>
                <div className="text-justify text-sm md:text-md">
                  {about && <Markdown>{about}</Markdown>}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="culture" className="py-6 md:py-12">
          <div className="flex flex-col space-y-8">
            {pitch && (
              <div className="flex flex-col space-y-4">
                <h1 className="text-md font-bold text-gray-800 md:text-lg">
                  Why join us?
                </h1>
                <div className="text-justify text-sm md:text-md">
                  {pitch && <Markdown>{pitch}</Markdown>}
                </div>
              </div>
            )}
            {perks && perks.length > 0 && (
              <div className="flex flex-col space-y-4">
                <h1 className="text-md font-bold text-gray-800 md:text-lg">
                  Perks
                </h1>
                <ul className="list-inside text-sm md:text-md">
                  {perks.map((item, index) => (
                    <li key={`${item}${index}`}>{item?.name}</li>
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
