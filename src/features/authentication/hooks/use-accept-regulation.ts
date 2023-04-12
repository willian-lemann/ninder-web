import { api } from "@/utils/api";

export function useAcceptRegulation() {
  const { mutateAsync } = api.regulations.acceptRegulation.useMutation();

  async function acceptRegulation() {
    await mutateAsync();
  }

  return {
    acceptRegulation,
  };
}
