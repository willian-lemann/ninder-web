import { api } from "@config/axios";
import { useAuthContext } from "@context/auth";
import { User } from "@data/models/user";

import { useCallback, useMemo, useState } from "react";

import useSWR, { KeyedMutator } from "swr";

export interface UsersContextParams {
  isLoading: boolean;
  isEmpty: boolean;
  users: User[];
  search(filter: string): void;
  mutate: KeyedMutator<User[]>;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data.result);

export const useUsers = (): UsersContextParams => {
  const { isAuthenticated } = useAuthContext();

  const [queryFilter, setQueryFilter] = useState("");

  const { data, mutate } = useSWR<User[]>(
    isAuthenticated ? `/users` : null,
    fetcher
  );

  const isLoading = !data;
  const isEmpty = data?.length === 0;

  const search = (filter: string) => {
    setQueryFilter(filter);
  };

  const users = useMemo(() => {
    const filteredUsers =
      queryFilter.length > 0
        ? data?.filter((user) =>
            user.name?.toLowerCase().includes(queryFilter.toLowerCase())
          )
        : data;

    return filteredUsers as User[];
  }, [data, queryFilter]);

  return {
    mutate,
    isLoading,
    users,
    isEmpty,
    search,
  };
};
