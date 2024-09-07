"use client";

import useSearchHistory from "@/hooks/useSearchHistory";
import { ChevronLeft, ChevronRight, Eraser, SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomeSearchHistory() {
  const [history, setHistory] = useState([]);
  const { getSearchFilterHistory, removeSearchFilter, clearSearchFilters } =
    useSearchHistory({
      localStorageName: "workifind.search-history",
    });
  const hasHistory = history.length > 0;

  function handleRemoveSearchFilter(
    e: React.MouseEvent<HTMLButtonElement>,
    item: string,
  ) {
    e.preventDefault();
    removeSearchFilter(item);
    setHistory(getSearchFilterHistory());
  }

  function handleClearSearchFilters() {
    clearSearchFilters();
    setHistory(getSearchFilterHistory());
  }

  useEffect(() => {
    setHistory(getSearchFilterHistory());
  }, []);

  return (
    hasHistory && (
      <section className="flex w-full flex-col gap-4 py-2 md:py-4">
        <div className="flex items-center justify-between gap-8">
          <h1 className="text-md font-semibold text-gray-900 md:text-lg lg:text-xl">
            Filter history
          </h1>
          <button
            className="flex w-fit cursor-pointer items-center justify-between gap-4 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200"
            onClick={handleClearSearchFilters}
          >
            <span className="text-nowrap text-sm font-semibold">Clear all</span>
            <Eraser size={14} />
          </button>
        </div>
        <div className="flex h-full w-full gap-2 py-2">
          <button className="custom-prev cursor-pointer rounded-lg border border-gray-100 px-3 py-2 hover:bg-gray-50">
            <ChevronLeft size={18} />
          </button>
          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
          >
            {history.map(
              (
                item: { title: string; query: string; created: Date },
                index,
              ) => (
                <SwiperSlide
                  style={{ width: "190px" }}
                  key={`${index}-${item.title}-${JSON.stringify(item.created)}`}
                >
                  <Link
                    href={item?.query}
                    key={`${item?.query}-${index}`}
                    className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-gray-100 px-3 py-1 hover:bg-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      <SearchIcon size={15} />
                      <span className="truncate text-sm font-medium text-gray-900">
                        {item?.title}
                      </span>
                    </div>
                    <Button
                      size="icon"
                      className="h-7 w-7 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-300"
                      onClick={(e) => handleRemoveSearchFilter(e, item?.query)}
                    >
                      <X size={14} />
                    </Button>
                  </Link>
                </SwiperSlide>
              ),
            )}
          </Swiper>
          <button className="custom-next cursor-pointer rounded-lg border border-gray-100 px-3 py-2 hover:bg-gray-50">
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    )
  );
}
