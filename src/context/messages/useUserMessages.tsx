import { Message } from "@data/models/message";
import { api } from "@config/axios";

import { useChatsContext } from "@context/chat";
import { getNow } from "@functions/getNow";

import { useAuthContext } from "@context/auth";

import { addErrorNotification } from "@components/shared/alert";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { NewMessageEventDto } from "@dtos/chat/new-message-dto";

export interface InitialState {
  isLoading: boolean;
  isEmpty: boolean;
  messages: Message[];
  mutate: Dispatch<SetStateAction<Message[]>>;
  sendMessage: (newMessage: NewMessageEventDto) => Promise<void>;
}

const fetcher = (url: string) =>
  api.get(url).then((response) => response.data.result);

export const useUserMessages = (): InitialState => {
  const { user: currentUser } = useAuthContext();
  const { currentChat, chats, setChats } = useChatsContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sendMessage = async (newMessage: NewMessageEventDto) => {
    const message: NewMessageEventDto = {
      chatId: newMessage.chatId,
      message: newMessage.message,
      userId: newMessage.userId,
      createdBy: newMessage.createdBy,
    };

    const newChats = chats.map((chatItem) => {
      if (chatItem.id === message.chatId) {
        return {
          ...chatItem,
          lastMessage: {
            message: newMessage.message,
            createdAt: getNow(),
            sentBy: currentUser?.id as string,
          },
        };
      }

      return chatItem;
    });

    setChats(newChats);

    setMessages((state) => [
      ...state,
      {
        chatId: currentChat?.id as string,
        sentBy: currentUser?.id as string,
        message: newMessage.message,
        createdAt: getNow(),
      },
    ]);

    // socket.emit("send-message", message);
  };

  const onReceiveMessage = useCallback(
    (newMessage: Message) => {
      const isReceiver = newMessage.sentBy !== currentUser?.id;

      if (isReceiver) {
        setMessages((state) => [...state, newMessage]);
      } else {
      }
    },
    [currentUser?.id]
  );

  // useEffect(() => {
  //   socket?.on("on-received-message", onReceiveMessage);

  //   return () => {
  //     socket.off("on-received-message", onReceiveMessage);
  //   };
  // }, [onReceiveMessage, socket]);

  useEffect(() => {
    const loadMessages = async () => {
      // const response = await api.get(`/messages/${currentChat?.id}`);
      // const { success, error, result } = response.data;
      // if (!success) {
      //   return addErrorNotification(error.message);
      // }
      // setMessages(result);
    };

    loadMessages().finally(() => setIsLoading(false));
  }, [currentChat]);

  return {
    mutate: setMessages,
    isEmpty: messages?.length === 0,
    isLoading,
    messages,
    sendMessage,
  };
};
