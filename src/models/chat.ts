import { Timestamp } from "firebase/firestore";

interface LastMessage {
  message: string;
  sentAt: Timestamp;
  sentBy: string;
  unRead: boolean;
}

export interface Chat {
  id?: string;
  users: Array<{ id: string; name: string; avatar: string }>;
  lastMessage: LastMessage;
}
