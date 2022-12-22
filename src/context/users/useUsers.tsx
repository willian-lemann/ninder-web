/* eslint-disable react-hooks/rules-of-hooks */

import { useAuthContext } from "@context/auth";
import { User } from "@models/user";
import { getUsersService } from "@services/user/getUsersService";
import { useMemo } from "react";

import useSWR from "swr";

export const useUsers = (queryFilter = "") => {
  const { user: currentUser } = useAuthContext();
  const usersData = useSWR("/users", () =>
    getUsersService().then((response) => response.data.result)
  );

  const isLoading = !usersData.data;
  const isEmpty = usersData.data?.length === 0;

  const users = useMemo(() => {
    const data =
      queryFilter.length > 0
        ? usersData.data?.filter((user) =>
            user.name?.toLowerCase().includes(queryFilter.toLowerCase())
          )
        : usersData.data;

    const nearbyUsersWithoutMe = data?.filter(
      (user) => user.id !== currentUser?.id
    );

    return nearbyUsersWithoutMe as User[];
  }, [currentUser?.id, queryFilter, usersData.data]);

  return {
    ...usersData,
    isLoading,
    users,
    isEmpty,
  };
};
