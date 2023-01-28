import useSWR, { KeyedMutator } from "swr";

import { api } from "@config/axios";
import { Chat } from "@data/models/chat";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuthContext } from "@context/auth";
import { NewChatDto } from "@dtos/chat/start-chat-dto";
import Router from "next/router";

export interface ContextParams {
  chats: Chat[];
  mutate: KeyedMutator<Chat[]>;
  error: any;
  isEmpty: boolean;
  isLoading: boolean;
  currentChat: Chat | null;
  setCurrentChat: Dispatch<SetStateAction<Chat | null>>;
  startNewChat(newChat: NewChatDto): void;
}

const fetcher = (url: string) =>
  api.get(url).then((response) => response.data.result);

export const useUserChats = (): ContextParams => {
  const { isAuthenticated } = useAuthContext();
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const { data, error, isLoading, mutate } = useSWR<Chat[]>(
    isAuthenticated ? "/chats" : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const startNewChat = (newChat: NewChatDto) => {
    const alreadyHasChat = data?.find(
      (chat) => chat.user.id === newChat.user.id
    );

    if (alreadyHasChat) {
      return Router.push(`/chats`);
    }

    if (data) {
      mutate([...data, newChat], false);
    } else {
      mutate([newChat], false);
    }
  };

  return {
    chats: data as Chat[],
    mutate,
    error,
    isEmpty: data?.length === 0,
    isLoading,
    currentChat,
    startNewChat,
    setCurrentChat,
  };
};
