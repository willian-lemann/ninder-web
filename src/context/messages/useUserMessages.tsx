import { useState } from "react";

import useSWR, { KeyedMutator } from "swr";

import { Message } from "@data/models/message";
import { NewMessageDto } from "@dtos/chat/send-message-dto";
import { api } from "@config/axios";

import { sendMessageService } from "@services/message/send-message";

export interface InitialState {
  isLoading: boolean;
  isEmpty: boolean;
  messages: Message[];
  mutate: KeyedMutator<Message[]>;
  isSendingMessage: boolean;
  sendMessage: (params: NewMessageDto) => Promise<void>;
}

const fetcher = (url: string) =>
  api.get(url).then((response) => response.data.result);

export const useUserMessages = (chatId = ""): InitialState => {
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const { data, mutate, isLoading } = useSWR(`/messages/${chatId}`, fetcher);

  const sendMessage = async (params: NewMessageDto) => {
    await sendMessageService(params);
  };

  return {
    mutate,
    isEmpty: data?.length === 0,
    isSendingMessage,
    isLoading,
    messages: data as Message[],
    sendMessage,
  };
};
