/* eslint-disable react-hooks/rules-of-hooks */

import { addErrorNotification } from "@components/shared/alert";
import { useAuthContext } from "@context/auth";
import { User } from "@data/entities/user";
import { getUsersUseCase } from "@data/useCases/user";
import { Location } from "@dtos/users/location";
import { useGeoLocation } from "@hooks/useGeoLocation";

import { useEffect, useMemo, useState } from "react";

import useSWR from "swr";

export const useUsers = (queryFilter = "", location?: Location | null) => {
  const { user: currentUser } = useAuthContext();
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // const usersData = useSWR(
  //   "/users",
  //   () =>
  //     getUsersUseCase(currentUser?.id as string, location).then(
  //       (response) => response.data.result
  //     ),
  //   {
  //     revalidateOnFocus: false,
  //     revalidateIfStale: false,
  //   }
  // );

  const isEmpty = data.length === 0;

  const users = useMemo(() => {
    const filteredUsers =
      queryFilter.length > 0
        ? data.filter((user) =>
            user.name?.toLowerCase().includes(queryFilter.toLowerCase())
          )
        : data;

    return filteredUsers as User[];
  }, [data, queryFilter]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getUsersUseCase(
          currentUser?.id as string,
          location
        );

        const { result } = response.data;
        setData(result);
      } catch (error) {
        addErrorNotification(error as any);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [currentUser?.id, location]);

  return {
    isLoading,
    users,
    isEmpty,
  };
};
