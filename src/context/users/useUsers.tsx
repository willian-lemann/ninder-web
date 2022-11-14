import { useAuthContext } from "@context/auth";
import { getUsersService } from "@services/user/getUsersService";
import useSWR from "swr";

export const useUsers = () => {
  return useSWR("/users", () =>
    getUsersService().then((response) => response.data.result)
  );
};
