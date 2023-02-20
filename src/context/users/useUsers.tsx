import { api } from "@config/axios";
import { useAuthContext } from "@context/auth";
import { User } from "@data/models/user";
import { getUsersService } from "@services/user/get-users";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

import useSWR, { KeyedMutator } from "swr";

export interface UsersContextParams {
  isLoading: boolean;
  isEmpty: boolean;
  users: User[];
  queryFilter: string;
  searchUsers(filter: string): void;
  setUsers: Dispatch<SetStateAction<User[]>>;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data.result);

export const useUsers = (): UsersContextParams => {
  const [queryFilter, setQueryFilter] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isEmpty = users.length === 0;

  const searchUsers = (filter: string) => {
    setQueryFilter(filter);
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await getUsersService();

      setUsers(response.data.result);
    };

    loadData();
  }, []);

  return {
    setUsers,
    isLoading,
    users,
    isEmpty,
    searchUsers,
    queryFilter,
  };
};
