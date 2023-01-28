import { Chat } from "@data/models/chat";

export interface CreateChatDto extends Omit<Chat, "id"> {}
