export interface Chat {
  id: string;
  user: {
    id: string;
    avatar: string;
    name: string;
  };
  lastMessage: {
    message: string;
    sentAt: Date;
  };
}
