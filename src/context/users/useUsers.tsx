import { api } from "@config/axios";
import { useAuthContext } from "@context/auth";
import { User } from "@data/models/user";

import { useCallback, useMemo, useState } from "react";

import useSWR, { KeyedMutator, mutate } from "swr";

export interface UsersContextParams {
  isLoading: boolean;
  isEmpty: boolean;
  users: User[];
  search(filter: string): void;
  mutate: KeyedMutator<User[]>;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const useUsers = (): UsersContextParams => {
  const [queryFilter, setQueryFilter] = useState("");

  const { data } = useSWR<{
    result: User[];
    error: { message: string };
    success: boolean;
  }>(`/users`, fetcher, { shouldRetryOnError: false });

  const isLoading = !data?.result;
  const isEmpty = data?.result?.length === 0;

  const search = (filter: string) => {
    setQueryFilter(filter);
  };

  const users = useMemo(() => {
    const filteredUsers =
      queryFilter.length > 0
        ? data?.result?.filter((user) =>
            user.name?.toLowerCase().includes(queryFilter.toLowerCase())
          )
        : data?.result;

    return filteredUsers as User[];
  }, [data?.result, queryFilter]);

  return {
    mutate,
    isLoading,
    users,
    isEmpty,
    search,
  };
};
