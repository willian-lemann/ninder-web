import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Router from "next/router";

import {
  collection,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { firestore } from "@config/firebase";

import {
  getChatsUseCase,
  startChatUseCase,
  updateChatUseCase,
} from "@data/useCases/chat";

import { Chat, User as CurrentUser } from "@data/entities";
import { useAuthContext } from "@context/auth";
import { ChatDTO, UserDTO } from "@data/dtos";
import { StartChatDto } from "@dtos/chat/start-chat-dto";
import { addErrorNotification } from "@components/shared/alert";
import { getSortedChatsByRecent } from "@utils/getSortedChatsByRecent";
import { useNotification } from "@hooks/useNotification";

export interface InitialState {
  chats: ChatDTO[];
  currentChat: ChatDTO | null;
  numberOfUnReadChats: number;
  isEmpty: boolean;
  isLoading: boolean;
  mutate: Dispatch<SetStateAction<ChatDTO[]>>;
  setCurrentChat: Dispatch<SetStateAction<ChatDTO | null>>;
  startNewChat: (params: StartChatDto) => Promise<void>;
  focusInChat: (id: string) => Promise<void>;
}

function getUserChatWith(currentUser: CurrentUser, users: UserDTO[]) {
  const userChatWith = users.find((user) => user.id !== currentUser.id);
  return userChatWith as UserDTO;
}

let notification: Notification;

export const useUserChats = (): InitialState => {
  const { notify } = useNotification();
  const { user: currentUser } = useAuthContext();
  const unsubscribeRef = useRef<Unsubscribe>();
  const [chats, setChats] = useState<ChatDTO[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const numberOfUnReadChats = useMemo(
    () => chats.filter((chat) => chat.lastMessage?.unRead).length,
    [chats]
  );

  const focusInChat = async (id: string) => {
    const chat = chats.find((chatItem) => chatItem.id === id) as ChatDTO;

    setCurrentChat(chat);

    const previousChats = structuredClone(chats);

    const newChats = chats.map((chatItem) => {
      if (chatItem.id === chat.id) {
        return {
          ...chatItem,
          lastMessage: {
            ...chatItem.lastMessage,
            unRead: false,
          },
        };
      }

      return chatItem;
    });

    try {
      await updateChatUseCase({
        id: chat.id,
        lastMessage: { ...chat.lastMessage, unRead: false },
      });

      setChats(newChats);
    } catch (error) {
      setChats(previousChats);
      addErrorNotification(JSON.stringify(error));
    }
  };

  const startNewChat = async ({
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
    const querySnapshot = query(
      chatUsersRef,
      where("users", "array-contains", {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
      })
    );

    const subscriber = onSnapshot(querySnapshot, (docSnap) => {
      const data = docSnap.docs.map((doc) => {
        const newChatData = { ...doc.data(), id: doc.id } as Chat;

        const userChatWith = getUserChatWith(currentUser, newChatData.users);

        const newChat = {
          id: newChatData.id,
          user: userChatWith,
          lastMessage: { ...newChatData.lastMessage, unRead: true },
        } as ChatDTO;

        return newChat;
      });

      const orderedByRecent = getSortedChatsByRecent(data);

      setChats(orderedByRecent);

      const lastSending = data[0];

      const isReceiver = currentUser.id !== lastSending.lastMessage.sentBy;
    });

    unsubscribeRef.current = subscriber;

    return () => {
      unsubscribeRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [currentUser]);

  return {
    isEmpty: chats.length === 0 && !isLoading,
    isLoading,
    numberOfUnReadChats,
    chats,
    currentChat,
    startNewChat,
    setCurrentChat,
    mutate: setChats,
    focusInChat,
  };
};
