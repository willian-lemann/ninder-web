import { Timestamp } from "firebase/firestore";

export interface Chat {
  id?: string;
  lastMessage: {
    message: string;
    createdAt: Date | null;
  };
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}
