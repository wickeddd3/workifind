"use client";

import useSearchHistory from "@/hooks/useSearchHistory";
import { Eraser, SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-grow flex-wrap gap-4 py-4">
          {history.map(
            (item: { title: string; query: string; created: Date }) => (
              <Link href={item?.query} key={item?.query}>
                <span className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-gray-100 px-3 py-1 hover:bg-gray-200">
                  <SearchIcon size={14} />
                  <span className="text-sm font-medium">{item?.title}</span>
                  <Button
                    size="icon"
                    className="h-7 w-7 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-300"
                    onClick={(e) => handleRemoveSearchFilter(e, item?.query)}
                  >
                    <X size={14} />
                  </Button>
                </span>
              </Link>
            ),
          )}
        </div>
        <span
          className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200"
          onClick={handleClearSearchFilters}
        >
          <span className="text-nowrap text-sm font-semibold">Clear all</span>
          <Eraser size={14} />
        </span>
      </div>
    )
  );
}
