import { saveToStorageGateway } from "@data/gateways/auth/saveToStorageGateway";

export function saveToStorageUseCase(value: string) {
  saveToStorageGateway(value);
}
