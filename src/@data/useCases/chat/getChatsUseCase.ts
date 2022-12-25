import { getChatsGateway } from "@data/gateways/chat/getChatsGateway";

interface Params {
  id: string;
  name: string;
  avatar: string;
}

export async function getChatsUseCase(currentUser: Params) {
  return await getChatsGateway(currentUser);
}
