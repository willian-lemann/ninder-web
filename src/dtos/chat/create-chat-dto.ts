import { Chat } from "@models/chat";

export interface CreateChatDto extends Omit<Chat, "id"> {}
