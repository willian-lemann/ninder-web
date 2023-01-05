import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { firestore } from "@config/firebase";
import useSWR, { KeyedMutator } from "swr";

import { getMessagesUseCase, sendMessageUseCase } from "@data/useCases/message";
import { Message } from "@data/entities/message";
import { SendMessageDto } from "@dtos/chat/send-message-dto";
import { isEmptyString } from "@functions/asserts/isEmpty";
import { useChatsContext } from "@context/chat";
import { getChatsUseCase } from "@data/useCases/chat";
import { useAuthContext } from "@context/auth";
import { ChatDTO } from "@data/dtos";

export interface InitialState {
  isLoading: boolean;
  isEmpty: boolean;
  messages: Message[];
  mutate: KeyedMutator<Message[]>;
  isSendingMessage: boolean;
  sendMessage: (params: SendMessageDto) => Promise<void>;
}

export const useUserMessages = (): InitialState => {
  const { currentChat } = useChatsContext();
  const unsubscribeRef = useRef<Unsubscribe>();
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const { data, mutate, isLoading } = useSWR(
    `/messages/${currentChat?.id}`,
    () => getMessagesUseCase(currentChat?.id as string).then((result) => result)
  );

  const sendMessage = async (params: SendMessageDto) => {
    setIsSendingMessage(true);

    if (isEmptyString(params.messageText)) return;

    await sendMessageUseCase(params);

    setIsSendingMessage(false);
  };

  useEffect(() => {
    if (!currentChat) return;

    const messagesRef = collection(firestore, "messages");

    const querySnapshot = query(
      messagesRef,
      where("chatId", "==", currentChat?.id as string)
    );

    const subscribe = onSnapshot(querySnapshot, (docSnap) => {
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

      mutate(mostRecentSorted.reverse(), false);
    });

    unsubscribeRef.current = subscribe;

    return () => {
      unsubscribeRef.current?.();
    };
  }, [currentChat, mutate]);

  return {
    mutate,
    isEmpty: data?.length === 0,
    isSendingMessage,
    isLoading,
    messages: data as Message[],
    sendMessage,
  };
};
