import { UpdateChatDto } from "@dtos/chat/update-chat-dto";
import { updateChatGateway } from "@data/gateways/chat/updateChatGateway";
import { Timestamp } from "firebase/firestore";

export async function updateChatUseCase(params: UpdateChatDto) {
  const { id, ...data } = params;

  await updateChatGateway({ id: params.id as string, data });
}
