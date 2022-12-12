export interface Chat {
  id: string;
  user: {
    avatar: string;
    name: string;
  };
  lastMessage: {
    message: string;
    sentAt: Date;
  };
}
