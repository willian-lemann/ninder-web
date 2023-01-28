export interface Message {
  id?: string;
  message: string;
  chatId: string;
  createdAt: Date | null;
  sentBy: string;
}
