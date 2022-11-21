import { addErrorNotification } from "@components/shared/alert";
import { User } from "@models/user";
import { getUsersService } from "@services/user/getUsersService";
import { Dispatch, SetStateAction, useState } from "react";

export interface InitialState {
  isFetching: boolean;
  isEmpty: boolean;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
}

export const useUsers = (): InitialState => {
  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const isEmpty = users.length === 0;

  return {
    isFetching,
    isEmpty,
    setIsFetching,
    users,
    setUsers,
  };
};
