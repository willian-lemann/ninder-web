import { UserDTO } from "@data/dtos";

export interface StartChatDto {
  userId: string;
  messageText: string;
  talkingUser: UserDTO;
}
