import { User } from "@data/entities/user";
import { updateGateway } from "@data/gateways/user/update-gateway";

export async function updateUseCase(id: string, data: Partial<User>) {
  return await updateGateway(id, data);
}
