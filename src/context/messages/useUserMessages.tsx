import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { collection, onSnapshot, query, Unsubscribe } from "firebase/firestore";
import { firestore } from "@config/firebase";

import { getMessagesUseCase, sendMessageUseCase } from "@data/useCases/chat";
import { Message } from "@data/entities/message";
import { SendMessageDto } from "@dtos/chat/send-message-dto";

export interface InitialState {
  isLoading: boolean;
  isEmpty: boolean;
  messages: Message[];
  mutate: Dispatch<SetStateAction<Message[]>>;
  isSendingMessage: boolean;
  loadMessages: (chatId: string) => void;
  sendMessage: (params: SendMessageDto) => Promise<void>;
}

export const useUserMessages = (): InitialState => {
  const unsubscribeRef = useRef<Unsubscribe>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const isEmpty = messages?.length === 0 && !isLoading;

  const sendMessage = async (params: SendMessageDto) => {
    setIsSendingMessage(true);

    await sendMessageUseCase(params);

    setIsSendingMessage(false);
  };

  const loadMessages = async (chatId = "") => {
    setIsLoading(true);

    const messages = await getMessagesUseCase(chatId);
    setMessages(messages);

    setIsLoading(false);
  };

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");

    const subscribe = onSnapshot(messagesRef, (docSnap) => {
      const data = docSnap.docs.map((doc) => {
        const newMessage = {
          ...doc.data(),
          id: doc.id,
        } as Message;
        return newMessage;
      });

      const mostRecentSorted = data.sort((a, b) => {
        if (!a.sentAt) return -1;

        if (a.sentAt.seconds < Number(b.sentAt.seconds)) return 1;

        return -1;
      });

      setMessages(mostRecentSorted.reverse());
    });

    unsubscribeRef.current = subscribe;

    return () => {
      unsubscribeRef.current?.();
    };
  }, []);

  return {
    mutate: setMessages,
    isEmpty,
    isSendingMessage,
    isLoading,
    messages,
    loadMessages,
    sendMessage,
  };
};
