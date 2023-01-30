import { api } from "@config/axios";
import { NewMessageDto } from "@dtos/chat/new-message-dto";

export async function sendMessageService(newMessage: NewMessageDto) {
  const response = await api.post("/messages", newMessage);
  return response;
}
