"use client";

import { Eraser, SearchIcon, X } from "lucide-react";

export default function HomeSearchHistory() {
  const history = ["frontend developer", "web designer", "graphic artist"];
  const hasHistory = history.length > 0;

  return (
    hasHistory && (
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-grow flex-wrap gap-4 py-4">
          {history.map((item) => (
            <span
              key={item}
              className="flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200"
            >
              <SearchIcon size={14} />
              <span className="text-sm font-medium">{item}</span>
              <X size={14} />
            </span>
          ))}
        </div>
        <span className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200">
          <span className="text-nowrap text-sm font-semibold">Clear all</span>
          <Eraser size={14} />
        </span>
      </div>
    )
  );
}
