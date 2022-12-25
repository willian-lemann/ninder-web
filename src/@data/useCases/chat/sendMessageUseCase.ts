import { Timestamp } from "firebase/firestore";

import { createMessageGateway } from "@data/gateways/message/createMessageGateway";
import { SendMessageDto } from "@dtos/chat/send-message-dto";

export async function sendMessageUseCase(sendMessageDto: SendMessageDto) {
  const sentAt = Timestamp.fromDate(new Date());

  await createMessageGateway({
    data: {
      chatId: sendMessageDto.chatId,
      messageText: sendMessageDto.messageText,
      sentAt,
      sentBy: sendMessageDto.sentBy,
      user: sendMessageDto.user,
    },
  });
}
