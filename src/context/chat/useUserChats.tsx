import { api } from "@config/axios";
import { Chat } from "@data/models/chat";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { NewChatDto } from "@dtos/chat/start-chat-dto";
import Router from "next/router";
import { addErrorNotification } from "@components/shared/alert";

export interface ContextParams {
  chats: Chat[];
  setChats: Dispatch<SetStateAction<Chat[]>>;
  isEmpty: boolean;
  isLoading: boolean;
  currentChat: Chat | null;
  setCurrentChat: Dispatch<SetStateAction<Chat | null>>;
  startNewChat(newChat: NewChatDto): void;
  checkHasChat(id: string): boolean;
}

export const useUserChats = (): ContextParams => {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const checkHasChat = (id: string) => {
    const chat = chats.find((chatItem) => chatItem.user.id === id);
    return !!chat;
  };

  const startNewChat = (newChat: NewChatDto) => {
    const alreadyHasChat = chats?.find(
      (chat) => chat.user.id === newChat.user.id
    );

    if (alreadyHasChat) {
      return Router.push(`/chats`);
    }

    const newChats = [...chats, newChat];

    localStorage.setItem("@ninder.chats", JSON.stringify(newChats));

    setChats(newChats);

    Router.push(`/chats`);
  };

  useEffect(() => {
    const loadChats = async () => {
      // try {
      //   const response = await api.get("/chats");

      //   const { success, error, result } = response.data;

      //   if (!success) {
      //     return addErrorNotification(error.message);
      //   }

      //   setChats(result);
      // } catch (error) {
      //   addErrorNotification(error);
      // } finally {
      //   setIsLoading(false);
      // }
    };

    loadChats();
  }, []);

  return {
    chats,
    setChats,
    isEmpty: chats.length === 0,
    isLoading,
    currentChat,
    startNewChat,
    setCurrentChat,
    checkHasChat,
  };
};
