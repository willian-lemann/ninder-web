/* eslint-disable react-hooks/rules-of-hooks */

import { addErrorNotification } from "@components/shared/alert";
import { useAuthContext } from "@context/auth";
import { User } from "@data/entities/user";
import { getUsersUseCase } from "@data/useCases/user";
import { Location } from "@dtos/users/location";

import { useMemo } from "react";

import useSWR from "swr";

export const useUsers = (queryFilter = "", location?: Location | null) => {
  const { user: currentUser } = useAuthContext();

  const usersData = useSWR(
    "/users",
    () =>
      getUsersUseCase(currentUser?.id as string, location).then(
        (response) => response?.data.result
      ),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const isLoading = !usersData.data;
  const isEmpty = usersData.data?.length === 0;

  const users = useMemo(() => {
    const filteredUsers =
      queryFilter.length > 0
        ? usersData.data?.filter((user) =>
            user.name?.toLowerCase().includes(queryFilter.toLowerCase())
          )
        : usersData.data;

    return filteredUsers as User[];
  }, [queryFilter, usersData.data]);

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     try {
  //       const response = await getUsersUseCase(
  //         currentUser?.id as string,
  //         location
  //       );

  //       const { result } = response.data;
  //       setData(result);
  //     } catch (error) {
  //       addErrorNotification(error as any);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   loadUsers();
  // }, [currentUser?.id, location]);

  return {
    ...usersData,
    isLoading,
    users,
    isEmpty,
  };
};
