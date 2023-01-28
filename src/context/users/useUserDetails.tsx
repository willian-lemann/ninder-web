import { api } from "@config/axios";
import { User } from "@data/models/user";

import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then((response) => response.data);

export const useUserDetails = (id: string) => {
  const userData = useSWR(`/users/${id}`, fetcher);

  const isLoading = !userData.data;

  return {
    ...userData,
    isLoading,
    user: userData.data as User,
  };
};
