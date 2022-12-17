import { Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  sentBy: string;
  chatId: string;
  sentAt: Timestamp;
  messageText: string;
}
