import { Chat } from "@data/entities";

export interface CreateChatDto extends Omit<Chat, "id"> {}
