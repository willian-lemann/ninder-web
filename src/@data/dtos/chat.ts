import { Chat } from "@data/entities";

export interface UserDTO {
  id: string;
  name: string;
  avatar: string;
}

export interface ChatDTO extends Omit<Chat, "users"> {
  user: UserDTO;
}
