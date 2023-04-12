import { api } from "@/utils/api";

export function useUsers() {
  const { data } = api.users.getAll.useQuery();

  return {
    users: data,
    isLoading: !data,
    isEmpty: data?.length === 0,
  };
}
