import { Message } from "@data/models/message";

export interface NewMessageDto {
  message: string;
  chatId: string | null;
  userId: string;
}
