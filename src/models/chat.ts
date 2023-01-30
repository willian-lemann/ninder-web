export interface Chat {
  id?: string;
  lastMessage: {
    message: string;
    createdAt: Date | null;
    sentBy: string;
  };
  isUnRead?: boolean;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}
