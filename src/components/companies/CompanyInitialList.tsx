"use client";

import { Employer, Job } from "@prisma/client";
import CompanyInitialListItem from "@/components/companies/CompanyInitialListItem";
import ViewMoreButton from "@/components/ViewMoreButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CompanyInitialListProps {
  companies: (Employer & { jobs: Job[] })[];
  hasSeeMoreButton?: boolean;
}

export default function CompanyInitialList({
  companies = [],
  hasSeeMoreButton = false,
}: CompanyInitialListProps) {
  return (
    <section className="flex w-full flex-col space-y-2 py-2 md:py-4">
      <h1 className="text-md font-semibold text-gray-900 md:text-lg lg:text-xl">
        Explore companies
      </h1>
      <h5 className="text-sm font-normal text-gray-700 md:text-md">
        Learn about new jobs and company culture.
      </h5>
      <div className="flex gap-4 py-2">
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="w-full [&_>_.swiper-pagination_>_.swiper-pagination-bullet-active]:bg-indigo-500 [&_>_.swiper-wrapper]:py-4"
        >
          {companies.map((company) => (
            <SwiperSlide style={{ width: "300px" }} key={company.slug}>
              <CompanyInitialListItem company={company} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {hasSeeMoreButton && (
        <ViewMoreButton text="See more" route="/companies" />
      )}
    </section>
  );
}
