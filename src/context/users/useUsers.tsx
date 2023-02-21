import { addErrorNotification } from "@components/shared/alert";
import { api } from "@config/axios";
import { useAuthContext } from "@context/auth";
import { User } from "@data/models/user";
import { getUsersService } from "@services/user/get-users";
import { ResponseError } from "@utils/createApiResponse";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  const { isAuthenticated } = useAuthContext();
  const [queryFilter, setQueryFilter] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isEmpty = users.length === 0;

  const searchUsers = (filter: string) => {
    setQueryFilter(filter);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getUsersService();

        const { result } = response.data;

        setUsers(result as User[]);
      } catch (error: any) {
        const err = error as ResponseError;
        addErrorNotification(err.response.data.error?.message as string);
      }
    };

    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  return {
    setUsers,
    isLoading,
    users,
    isEmpty,
    searchUsers,
    queryFilter,
  };
};
