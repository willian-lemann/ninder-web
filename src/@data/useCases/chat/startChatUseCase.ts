import { Timestamp } from "firebase/firestore";
import Router from "next/router";
import { SendMessageDto } from "@dtos/chat/send-message-dto";
import { UserDTO } from "@data/dtos";
import { createMessageGateway } from "@data/gateways/message/createMessageGateway";
import { createChatGateway } from "@data/gateways/chat/createChatGateway";
import { CreateChatDto } from "@dtos/chat/create-chat-dto";

import { getChatsUseCase } from "./";
import { Message } from "@data/entities";
import { isEmptyString } from "@functions/asserts/isEmpty";

interface Params {
  messageText: string;
  userId: string;
  talkingUser: UserDTO;
  currentUser: UserDTO;
}

export async function startChatUseCase({
  messageText,
  userId,
  talkingUser,
  currentUser,
}: Params) {
  if (isEmptyString(messageText)) return;

  const chats = await getChatsUseCase({
    id: currentUser.id as string,
    name: currentUser.name as string,
    avatar: currentUser.avatar as string,
  });

  const chat = chats.find((chat) => chat.user.id === userId);

  const sentAt = Timestamp.fromDate(new Date());

  if (chat) {
    const newMessage: Message = {
      chatId: chat.id as string,
      messageText,
      sentAt,
      sentBy: userId,
      user: talkingUser,
    };

    return await createMessageGateway({
      data: newMessage,
    });
  }

  try {
    const newChat: CreateChatDto = {
      users: [
        {
          id: currentUser.id as string,
          name: currentUser?.name as string,
          avatar: currentUser?.avatar as string,
        },
        talkingUser,
      ],
      lastMessage: {
        message: messageText,
        sentAt,
        unRead: false,
        sentBy: currentUser?.id as string,
      },
    };

    const chatId = await createChatGateway({ data: newChat });

    const newMessage: Message = {
      chatId,
      messageText,
      sentAt,
      sentBy: currentUser?.id as string,
      user: talkingUser,
    };

    return await createMessageGateway({ data: newMessage });
  } catch (error) {
    alert(error);
  }
}
