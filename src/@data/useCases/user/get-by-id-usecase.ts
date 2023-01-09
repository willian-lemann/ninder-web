import { getByIdGateway } from "@data/gateways/user/get-by-id-gateway";

export async function getByIdUseCase(id: string) {
  return await getByIdGateway(id);
}
