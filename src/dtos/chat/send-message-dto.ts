import { User } from "@models/chat";
import { Message } from "@models/message";

export interface SendMessageDto extends Omit<Message, "id"> {
  user: User;
}
