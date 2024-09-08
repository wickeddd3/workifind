"use client";

import { Applicant } from "@prisma/client";
import ProfessionalInitialListItem from "@/components/professionals/ProfessionalInitialListItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProfessionalInitialListProps {
  professionals: Applicant[];
}

export default function ProfessionalInitialList({
  professionals,
}: ProfessionalInitialListProps) {
  return (
    <section className="flex flex-col space-y-2 py-6">
      <h1 className="text-md font-semibold text-gray-900 md:text-lg lg:text-xl">
        Explore professionals
      </h1>
      <h5 className="text-sm font-normal text-gray-700 md:text-md">
        Learn about new jobs and company culture.
      </h5>
      <div className="flex py-4">
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
              <ProfessionalInitialListItem professional={professional} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
