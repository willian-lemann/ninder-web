import { addErrorNotification } from "@components/shared/alert";
import { User } from "@models/user";
import { getUsersService } from "@services/user/getUsersService";
import { Dispatch, SetStateAction, useState } from "react";

import useSWR from "swr";
export interface InitialState {
  isFetching: boolean;
  isEmpty: boolean;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
}

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
  // const [users, setUsers] = useState<User[]>([]);
  // const [isFetching, setIsFetching] = useState(true);
  // const isEmpty = users.length === 0;
  // return {
  //   isFetching,
  //   isEmpty,
  //   setIsFetching,
  //   users,
  //   setUsers,
  // };
};
