"use client";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { ApplicantSummary } from "@/entities/applicant/queries";

import { ProfessionalCard } from "./ProfessionalCard";

/**
 * Takes summaries, not records. This is the client boundary — every field on
 * what crosses it is serialized into the page source, so the query behind it
 * selects only what a card shows. Type-only import, so `queries.ts` is erased
 * rather than bundled.
 */
export function ProfessionalsCarousel({
  professionals,
}: {
  professionals: ApplicantSummary[];
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
      {professionals.map((professional) => (
        <SwiperSlide style={{ width: "276px" }} key={professional.id}>
          <ProfessionalCard professional={professional} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
