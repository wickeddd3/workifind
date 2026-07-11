"use client";

import { ChevronLeft, ChevronRight, Eraser, SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/shared/ui/button";

import type { SearchHistoryItem } from "../model/useSearchHistory";
import { useSearchHistory } from "../model/useSearchHistory";

export function SearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
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
    // Load persisted history once on mount; the hook's reader is stable in
    // behavior even though its identity changes each render.
    setHistory(getSearchFilterHistory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    hasHistory && (
      <section className="flex w-full flex-col gap-4 py-2 md:py-4">
        <div className="flex items-center justify-between gap-8">
          <h2 className="text-md font-semibold text-gray-900 md:text-lg lg:text-xl">
            Filter history
          </h2>
          <button
            type="button"
            className="flex w-fit cursor-pointer items-center justify-between gap-4 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            onClick={handleClearSearchFilters}
          >
            <span className="text-nowrap text-sm font-semibold">Clear all</span>
            <Eraser size={14} aria-hidden="true" />
          </button>
        </div>
        <div className="flex h-full w-full gap-2 py-2">
          <button
            type="button"
            aria-label="Scroll filter history left"
            className="custom-prev cursor-pointer rounded-lg border border-gray-100 px-3 py-2 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            <ChevronLeft size={18} aria-hidden="true" />
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
            {history.map((item, index) => (
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
                    <SearchIcon size={15} aria-hidden="true" />
                    <span className="truncate text-sm font-medium text-gray-900">
                      {item?.title}
                    </span>
                  </div>
                  <Button
                    size="icon"
                    aria-label={`Remove ${item?.title} from filter history`}
                    className="h-7 w-7 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-300"
                    onClick={(e) => handleRemoveSearchFilter(e, item?.query)}
                  >
                    <X size={14} aria-hidden="true" />
                  </Button>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            type="button"
            aria-label="Scroll filter history right"
            className="custom-next cursor-pointer rounded-lg border border-gray-100 px-3 py-2 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </section>
    )
  );
}
