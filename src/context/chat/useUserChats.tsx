import useSWR, { KeyedMutator } from "swr";

import { api } from "@config/axios";
import { Chat } from "@data/models/chat";
import { Dispatch, SetStateAction, useState } from "react";

export interface ContextParams {
  chats: Chat[];
  mutate: KeyedMutator<Chat[]>;
  error: any;
  isLoading: boolean;
  currentChat: Chat | null;
  setCurrentChat: Dispatch<SetStateAction<Chat | null>>;
  startNewChat(newChat: Chat): void;
}

const fetcher = (url: string) => api.get(url).then((response) => response.data);

export const useUserChats = (): ContextParams => {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const { data, error, isLoading, mutate } = useSWR<Chat[]>(`/chats`, fetcher);

  const startNewChat = async (newChat: Chat) => {
    if (data) {
      mutate([...data, newChat]);
    } else {
      mutate([newChat]);
    }
  };

  return {
    chats: data as Chat[],
    mutate,
    error,
    isLoading,
    currentChat,
    startNewChat,
    setCurrentChat,
  };
};
