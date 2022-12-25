import { UserDTO } from "@data/dtos";
import { Message } from "@data/entities";

export interface SendMessageDto extends Omit<Message, "id" | "sentAt"> {
  user: UserDTO;
}
