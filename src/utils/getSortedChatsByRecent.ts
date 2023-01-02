import { ChatDTO } from "@data/dtos";

export function getSortedChatsByRecent(chats: ChatDTO[]) {
  return chats.sort((a, b) => {
    if (!a.lastMessage?.sentAt) return -1;

    if (a.lastMessage.sentAt.seconds < Number(b.lastMessage?.sentAt.seconds))
      return 1;

    return -1;
  });
}
