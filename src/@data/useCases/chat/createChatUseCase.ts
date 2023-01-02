import { CreateChatDto } from "@dtos/chat/create-chat-dto";
import { createChatGateway } from "@data/gateways/chat/createChatGateway";

export async function createChatUseCase(createChatDto: CreateChatDto) {
  return createChatGateway({ data: createChatDto });
}
