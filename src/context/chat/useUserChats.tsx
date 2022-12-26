import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Router from "next/router";

import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { firestore } from "@config/firebase";

import { getChatsUseCase, startChatUseCase } from "@data/useCases/chat";

import { isEmptyString } from "@functions/asserts/isEmpty";

import { Chat, User as CurrentUser } from "@data/entities";
import { useAuthContext } from "@context/auth";
import { ChatDTO, UserDTO } from "@data/dtos";
import { StartChatDto } from "@dtos/chat/start-chat-dto";

export interface InitialState {
  chats: ChatDTO[];
  numberOfUnReadChats: number;
  isEmpty: boolean;
  isLoading: boolean;
  mutate: Dispatch<SetStateAction<ChatDTO[]>>;
  startChat: (params: StartChatDto) => Promise<void>;
}

function getUserChatWith(currentUser: CurrentUser, users: UserDTO[]) {
  const userChatWith = users.find((user) => user.id !== currentUser.id);
  return userChatWith as UserDTO;
}

export const useUserChats = (): InitialState => {
  const { user: currentUser } = useAuthContext();
  const unsubscribeRef = useRef<Unsubscribe>();
  const [chats, setChats] = useState<ChatDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const numberOfUnReadChats = useMemo(
    () => chats.filter((chat) => chat.lastMessage.unRead).length,
    [chats]
  );

  const startChat = async ({
    userId,
    messageText,
    talkingUser,
  }: StartChatDto) => {
    await startChatUseCase({
      currentUser: {
        id: currentUser?.id as string,
        name: currentUser?.name as string,
        avatar: currentUser?.avatar as string,
      },
      messageText,
      talkingUser,
      userId,
    });

    Router.push(`/chats`);
  };

  useEffect(() => {
    if (!currentUser) return;

    const chatUsersRef = collection(firestore, "chats");

    const subscriber = onSnapshot(chatUsersRef, (docSnap) => {
      const data = docSnap.docs.map((doc) => {
        const newChatData = { ...doc.data(), id: doc.id } as Chat;

        const userChatWith = getUserChatWith(currentUser, newChatData.users);

        const newChat = {
          ...newChatData,
          user: userChatWith,
          lastMessage: { ...newChatData.lastMessage, unRead: true },
        } as ChatDTO;

        return newChat;
      });

      setChats(data);
    });

    unsubscribeRef.current = subscriber;

    return () => {
      unsubscribeRef.current?.();
    };
  }, [currentUser]);

  useEffect(() => {
    const loadChats = async () => {
      const chats = await getChatsUseCase({
        id: currentUser?.id as string,
        name: currentUser?.name as string,
        avatar: currentUser?.avatar as string,
      });

      setChats(chats);
    };

    if (currentUser) {
      loadChats().finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return {
    isEmpty: chats.length === 0 && !isLoading,
    isLoading,
    numberOfUnReadChats,
    chats,
    startChat,
    mutate: setChats,
  };
};
