import { removeFavoriteGateway } from "@data/gateways/favorite/removeFavoriteGateway";

export async function removeFavoriteUseCase(id: string) {
  await removeFavoriteGateway(id);
}
