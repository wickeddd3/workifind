"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProfessionalCard } from "./ProfessionalCard";
import type { Applicant } from "@prisma/client";

export function ProfessionalsCarousel({
  professionals,
}: {
  professionals: Applicant[];
}) {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={15}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="w-full [&_>_.swiper-pagination_>_.swiper-pagination-bullet-active]:bg-indigo-500 [&_>_.swiper-wrapper]:py-4"
    >
      {professionals.map((professional) => (
        <SwiperSlide style={{ width: "276px" }} key={professional.id}>
          <ProfessionalCard professional={professional} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
