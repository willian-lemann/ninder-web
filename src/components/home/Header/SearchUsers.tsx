import {
  useState,
  KeyboardEvent,
  ChangeEvent,
  startTransition,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";

import { classNames } from "@utils/classNames";

import {
  MagnifyingGlassIcon as SearchIcon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useUsers } from "@context/users/useUsers";
import { useUsersContext } from "@context/users";
import { getUsersService } from "@services/user/getUsersService";
import { addErrorNotification } from "@components/shared/alert";

interface SearchUsersProps {
  onSearchFilter: Dispatch<SetStateAction<string>>;
}

export const SearchUsers = ({ onSearchFilter }: SearchUsersProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("");
  const { setUsers, setIsFetching } = useUsersContext();

  const handleSearch = useCallback(
    async (filter: string) => {
      setIsFetching(true);

      try {
        const response = await getUsersService(filter);

        const { result } = response.data;

        setUsers(result);
      } catch (error) {
        addErrorNotification("Error fetching users");
      } finally {
        setIsFetching(false);
      }
    },
    [setIsFetching, setUsers]
  );

  const handleSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    startTransition(() => {
      onSearchFilter(event.target.value);
    });
  };

  const handleReset = () => {
    if (searchValue.length === 0) {
      setFilter("");
      setSearchValue("");
    }
  };

  // useEffect(() => {
  //   handleSearch(filter);
  // }, [filter, handleSearch]);

  return (
    <div className="hidden sm:block sm:w-1/2 md:w-1/4">
      <div className="relative flex items-center">
        <input
          type="text"
          id="default-search"
          className="block p-3 pl-4 w-full shadow-sm hover:shadow-md transition-shadow duration-300 outline-none text-sm text-title-opacity  rounded-3xl border border-gray-300 "
          placeholder="Type a name and then ENTER..."
          value={searchValue}
          onChange={handleSearchFilter}
        />

        <button
          type="button"
          onClick={() => setFilter(searchValue)}
          className="text-white absolute right-0 rounded-full px-2 py-2 mr-2 flex items-center justify-center"
        >
          <SearchIcon className="text-title-opacity  h-6 w-6 relative" />
        </button>
      </div>
    </div>
  );
};
