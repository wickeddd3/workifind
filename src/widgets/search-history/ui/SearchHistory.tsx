"use client";

import { ChevronLeft, ChevronRight, Eraser, SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
            Recent searches
          </h2>
          <button
            type="button"
            className="flex w-fit shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            onClick={handleClearSearchFilters}
          >
            <Eraser size={14} aria-hidden="true" />
            <span className="text-nowrap">Clear all</span>
          </button>
        </div>
        <div className="flex h-full w-full items-center gap-2">
          <button
            type="button"
            aria-label="Scroll recent searches left"
            className="custom-prev shrink-0 cursor-pointer rounded-lg border border-gray-100 px-3 py-2 text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <Swiper
            slidesPerView="auto"
            spaceBetween={12}
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
          >
            {history.map((item, index) => (
              <SwiperSlide
                style={{ width: "auto" }}
                key={`${index}-${item.title}-${JSON.stringify(item.created)}`}
              >
                <Link
                  href={item?.query}
                  className="group flex max-w-[220px] items-center gap-2 rounded-lg border border-gray-100 bg-white py-1.5 pl-3 pr-1.5 shadow-soft transition-colors hover:border-gray-200 hover:bg-gray-50"
                >
                  <SearchIcon
                    size={15}
                    className="shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">
                    {item?.title}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${item?.title} from recent searches`}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
                    onClick={(e) => handleRemoveSearchFilter(e, item?.query)}
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            type="button"
            aria-label="Scroll recent searches right"
            className="custom-next shrink-0 cursor-pointer rounded-lg border border-gray-100 px-3 py-2 text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </section>
    )
  );
}
