import { Timestamp } from "firebase/firestore";

import { createMessageGateway } from "@data/gateways/message/createMessageGateway";
import { SendMessageDto } from "@dtos/chat/send-message-dto";
import { getNow } from "@functions/getNow";

import { updateChatGateway } from "@data/gateways/chat/updateChatGateway";

export async function sendMessageUseCase(sendMessageDto: SendMessageDto) {
  await createMessageGateway({
    data: {
      chatId: sendMessageDto.chatId,
      messageText: sendMessageDto.messageText,
      sentAt: getNow(),
      sentBy: sendMessageDto.sentBy,
      user: sendMessageDto.user,
    },
  });

  await updateChatGateway({
    id: sendMessageDto.chatId,
    data: {
      lastMessage: {
        message: sendMessageDto.messageText,
        sentBy: sendMessageDto.sentBy,
        unRead: false,
        sentAt: getNow(),
      },
    },
  });
}
