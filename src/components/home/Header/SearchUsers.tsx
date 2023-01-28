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
import { useUsers, useUsersContext } from "@context/users";

export const SearchUsers = () => {
  const [searchValue, setSearchValue] = useState("");
  const { searchUsers } = useUsersContext();

  const handleSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    startTransition(() => {
      searchUsers(searchValue);
    });
  };

  const handleReset = () => {
    setSearchValue("");
    searchUsers("");
  };

  return (
    <div className="hidden sm:block sm:w-1/2 md:w-1/4">
      <div className="relative flex items-center">
        <input
          type="text"
          id="default-search"
          className="block p-3 pl-4 w-full shadow-sm hover:shadow-md transition-shadow duration-300 outline-none text-base text-title-opacity rounded-full border border-gray-300 "
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
