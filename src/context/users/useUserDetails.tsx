import { useChatsContext } from "@context/chat";
import { User } from "@data/entities/user";
import { getUserUseCase } from "@data/useCases/user";
import useSWR from "swr";

export const useUserDetails = (id: string) => {
  const userData = useSWR(`/users/${id}`, () =>
    getUserUseCase(id).then((user) => user)
  );

  const isLoading = !userData.data;

  return {
    ...userData,
    isLoading,
    user: userData.data as User,
  };
};
