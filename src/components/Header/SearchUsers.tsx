import {
  MagnifyingGlassIcon as SearchIcon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { classNames } from "../../utils/classNames";

export const SearchUsers = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="hidden sm:block w-1/4">
      <div className="relative flex items-center">
        <input
          type="text"
          id="default-search"
          className="block p-3 pl-4 w-full shadow-sm hover:shadow-md transition-shadow duration-300 outline-none text-sm text-title-opacity  rounded-3xl border border-gray-300 "
          placeholder="Search for a user..."
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          required
        />

        <button
          type="submit"
          className="text-white absolute right-0 rounded-full px-2 py-2 mr-2 flex items-center justify-center"
        >
          <SearchIcon
            className={classNames(
              search ? "hidden" : "sr-only",
              "text-title-opacity  h-6 w-6 relative"
            )}
          />

          <XMarkIcon
            className={classNames(
              search ? "block" : "hidden",
              "text-title-opacity  h-6 w-6 relative"
            )}
          />
        </button>
      </div>
    </div>
  );
};
