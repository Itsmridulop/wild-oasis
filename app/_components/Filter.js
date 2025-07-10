"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilterChange(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="border border-primary-800 flex">
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === "all" ? "bg-primary-700" : ""}`}
        onClick={() => handleFilterChange("all")}
      >
        All Cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === "small" ? "bg-primary-700" : ""}`}
        onClick={() => handleFilterChange("small")}
      >
        Small Cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === "medium" ? "bg-primary-700" : ""}`}
        onClick={() => handleFilterChange("medium")}
      >
        Medium Cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === "large" ? "bg-primary-700" : ""}`}
        onClick={() => handleFilterChange("large")}
      >
        Large Cabins
      </button>
    </div>
  );
}
