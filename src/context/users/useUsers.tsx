/* eslint-disable react-hooks/rules-of-hooks */

import { User } from "@models/user";
import { getUsersService } from "@services/user/getUsersService";

import useSWR from "swr";

export const useUsers = () => {
  const usersData = useSWR("/users", () =>
    getUsersService().then((response) => response.data.result)
  );

  const isLoading = !usersData.data;
  const isEmpty = usersData.data?.length === 0;

  return {
    ...usersData,
    isLoading,
    users: usersData.data as User[],
    isEmpty,
  };
};
