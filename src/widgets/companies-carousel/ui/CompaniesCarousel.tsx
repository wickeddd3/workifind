"use client";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Company } from "@/entities/employer";

import { CompanyCard } from "./CompanyCard";

export function CompaniesCarousel({
  companies = [],
}: {
  companies: Company[];
}) {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={15}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="w-full [&_>_.swiper-pagination_>_.swiper-pagination-bullet-active]:bg-primary [&_>_.swiper-wrapper]:py-4"
    >
      {companies.map((company) => (
        <SwiperSlide style={{ width: "300px" }} key={company.slug}>
          <CompanyCard company={company} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
