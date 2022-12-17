import { Timestamp } from "firebase/firestore";
import { differenceInHours, format, formatDistanceToNow } from "date-fns";

interface LastMessage {
  message: string;
  sentAt: Timestamp;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Chat {
  id: string;
  users: Array<{ id: string; avatar: string; name: string }>;
  lastMessage: LastMessage | null;
}

export interface ChatModel extends Omit<Chat, "users"> {
  user: User;
}

export function formatDate(timestampDate: Timestamp) {
  if (!timestampDate) {
    return null;
  }

  const toDate = new Date(timestampDate.toDate());

  const hours = differenceInHours(new Date(), toDate);

  if (hours < 24) {
    const formattedDate = format(toDate, "h:mm aa");
    return formattedDate;
  }

  const formattedDate = formatDistanceToNow(toDate);

  return `${formattedDate} ago`;
}
