"use client";

import { Employer } from "@prisma/client";
import CompanyInitialListItem from "@/components/companies/CompanyInitialListItem";
import ViewMoreButton from "@/components/ViewMoreButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CompanyInitialListProps {
  companies: Employer[];
  hasSeeMoreButton?: boolean;
}

export default function CompanyInitialList({
  companies = [],
  hasSeeMoreButton = false,
}: CompanyInitialListProps) {
  return (
    <section className="flex w-full flex-col space-y-2 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Explore companies
      </h1>
      <h5 className="text-lg font-normal text-gray-700">
        Learn about new jobs and company culture.
      </h5>
      <div className="flex gap-4 py-4">
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="w-full [&_>_.swiper-pagination_>_.swiper-pagination-bullet-active]:bg-indigo-500 [&_>_.swiper-wrapper]:py-10"
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
