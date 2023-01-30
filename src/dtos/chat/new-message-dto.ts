export interface NewMessageDto {
  message: string;
  chatId: string | null;
  userId: string;
}

export interface NewMessageEventDto extends NewMessageDto {
  createdBy: string;
}
