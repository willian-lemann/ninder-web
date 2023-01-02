/* eslint-disable react-hooks/rules-of-hooks */

import { useAuthContext } from "@context/auth";
import { User } from "@data/entities/user";
import { getUsersUseCase } from "@data/useCases/user";
import { Location } from "@dtos/users/location";
import { useGeoLocation } from "@hooks/useGeoLocation";

import { useMemo } from "react";

import useSWR from "swr";

export const useUsers = (queryFilter = "", location?: Location | null) => {
  const { user: currentUser } = useAuthContext();

  const usersData = useSWR(
    "/users",
    () =>
      getUsersUseCase(currentUser?.id as string, location).then(
        (response) => response.data.result
      ),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
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

    return data as User[];
  }, [queryFilter, usersData.data]);

  return {
    ...usersData,
    isLoading,
    users,
    isEmpty,
  };
};
