import { Search } from "lucide-react";
import type { FilterOption } from "@/type/AdminType";

type SearchAndFiltersProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
  }[];
};

export default function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  searchPlaceholder = "Search...",
  filters = [],
}: SearchAndFiltersProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-500" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm sm:text-base text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          />
        </div>

        {/* Filter Dropdowns */}
        {filters.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            {filters.map((filter, index) => (
              <div key={index} className="w-full sm:w-auto">
                {/* Label for mobile */}
                <label className="block sm:hidden text-xs text-neutral-400 mb-1.5 font-medium">
                  {filter.label}
                </label>
                
                <select
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors sm:min-w-[150px]"
                  aria-label={filter.label}
                >
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}