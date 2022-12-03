import { User } from "@models/user";
import { getUserService } from "@services/user/getUserService";
import useSWR from "swr";

export const useUserDetails = (id: string) => {
  const userData = useSWR(`/users/${id}`, () =>
    getUserService(id).then((user) => user)
  );

  const isLoading = !userData.data;

  return {
    ...userData,
    isLoading,
    user: userData.data as User,
  };
};
