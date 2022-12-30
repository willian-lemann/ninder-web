import {
  useState,
  ChangeEvent,
  startTransition,
  Dispatch,
  SetStateAction,
} from "react";

import {
  MagnifyingGlassIcon as SearchIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface SearchUsersProps {
  onSearchFilter: Dispatch<SetStateAction<string>>;
}

export const SearchUsers = ({ onSearchFilter }: SearchUsersProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    startTransition(() => {
      onSearchFilter(event.target.value);
    });
  };

  const handleReset = () => {
    setSearchValue("");
    onSearchFilter("");
  };

  return (
    <div className="hidden sm:block sm:w-1/2 md:w-1/4">
      <div className="relative flex items-center">
        <input
          type="text"
          id="default-search"
          className="block p-3 pl-4 w-full shadow-sm hover:shadow-md transition-shadow duration-300 outline-none text-sm text-title-opacity rounded-full border border-gray-300 "
          placeholder="Search users..."
          value={searchValue}
          onChange={handleSearchFilter}
        />

        <button
          type="button"
          className="text-white absolute right-0 rounded-full px-2 py-2 mr-2 flex items-center justify-center"
        >
          {searchValue.length > 0 ? (
            <XMarkIcon
              className="text-title-opacity  h-6 w-6 relative animate-fadeIn"
              onClick={handleReset}
            />
          ) : (
            <SearchIcon className="text-title-opacity h-6 w-6 relative animate-fadeIn" />
          )}
        </button>
      </div>
    </div>
  );
};
