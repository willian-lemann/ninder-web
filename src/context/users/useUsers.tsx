import { addErrorNotification } from "@components/shared/alert";
import { api } from "@config/axios";
import { useAuthContext } from "@context/auth";
import { User } from "@data/models/user";
import { getUsersService } from "@services/user/get-users";
import { ResponseError } from "@utils/createApiResponse";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR, { KeyedMutator } from "swr";

export interface UsersContextParams {
  isLoading: boolean;
  isEmpty: boolean;
  users: User[];
  queryFilter: string;
  searchUsers(filter: string): void;
  setUsers: KeyedMutator<User[]>;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data.result);

export const useUsers = (): UsersContextParams => {
  const [queryFilter, setQueryFilter] = useState("");
  const { data, isLoading, mutate } = useSWR<User[]>("/users", fetcher);

  const users = data as User[];
  const isEmpty = users?.length === 0;

  const searchUsers = (filter: string) => {
    setQueryFilter(filter);
  };

  return {
    isLoading,
    users,
    isEmpty,
    searchUsers,
    queryFilter,
    setUsers: mutate,
  };
};
