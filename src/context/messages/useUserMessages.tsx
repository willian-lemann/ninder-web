import { useState } from "react";

import useSWR, { KeyedMutator } from "swr";

import { Message } from "@data/entities/message";
import { SendMessageDto } from "@dtos/chat/send-message-dto";

export interface InitialState {
  isLoading: boolean;
  isEmpty: boolean;
  messages: Message[];
  mutate: KeyedMutator<Message[]>;
  isSendingMessage: boolean;
  sendMessage: (params: SendMessageDto) => Promise<void>;
}

export const useUserMessages = (): InitialState => {
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const { data, mutate, isLoading } = useSWR(`/messages/`);

  const sendMessage = async (params: SendMessageDto) => {};

  return {
    mutate,
    isEmpty: data?.length === 0,
    isSendingMessage,
    isLoading,
    messages: data as Message[],
    sendMessage,
  };
};
