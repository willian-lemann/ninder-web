import { useAuthContext } from "@context/auth";
import { User } from "@data/entities/user";
import { getUsersUseCase } from "@data/useCases/user";

import { useCallback, useMemo, useState } from "react";

import useSWR, { KeyedMutator, mutate } from "swr";

export interface UsersContextParams {
  isLoading: boolean;
  isEmpty: boolean;
  users: User[];
  search(filter: string): void;
  mutate: KeyedMutator<User[]>;
}

export const useUsers = (): UsersContextParams => {
  const { user: currentUser } = useAuthContext();
  const [queryFilter, setQueryFilter] = useState("");

  const usersData = useSWR(`/users/${currentUser?.id}`, () =>
    getUsersUseCase(currentUser as User).then(
      (response) => response?.data.result
    )
  );

  const isLoading = !usersData.data;
  const isEmpty = usersData.data?.length === 0;

  const search = (filter: string) => {
    setQueryFilter(filter);
  };

  const users = useMemo(() => {
    const filteredUsers =
      queryFilter.length > 0
        ? usersData.data?.filter((user) =>
            user.name?.toLowerCase().includes(queryFilter.toLowerCase())
          )
        : usersData.data;

    return filteredUsers as User[];
  }, [queryFilter, usersData.data]);

  return {
    mutate,
    isLoading,
    users,
    isEmpty,
    search,
  };
};
