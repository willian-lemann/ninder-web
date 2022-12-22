import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { firestore } from "@config/firebase";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useSWR from "swr";
import { getUserChatsService } from "@services/chat/getUserChatsService";
import { Chat, ChatModel, User } from "@models/chat";
import { User as CurrentUser } from "@models/user";
import { useAuthContext } from "@context/auth";

export interface InitialState {
  chats: ChatModel[];
  numberOfUnReadChats: number;
  isEmpty: boolean;
  isLoading: boolean;
  mutate: Dispatch<SetStateAction<ChatModel[]>>;
  hasChatWith: (userId: string) => string;
}

function getUserChatWith(currentUser: CurrentUser, users: User[]) {
  const userChatWith = users.find((user) => user.id !== currentUser.id);
  return userChatWith as User;
}

export const useUserChats = (): InitialState => {
  const unsubscribeRef = useRef<Unsubscribe>();
  const { user } = useAuthContext();
  const [chats, setChats] = useState<ChatModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isEmpty = chats.length === 0 && !isLoading;

  const numberOfUnReadChats = useMemo(
    () => chats.filter((chat) => chat.lastMessage.unRead).length,
    [chats]
  );

  const hasChatWith = (userId: string) => {
    const chat = chats?.find((chat) => chat.user.id === userId);
    return chat?.id as string;
  };

  useEffect(() => {
    if (!user) return;

    const chatUsersRef = collection(firestore, "chats");

    const subscriber = onSnapshot(chatUsersRef, (docSnap) => {
      const data = docSnap.docs.map((doc) => {
        const newChatData = { ...doc.data(), id: doc.id } as Chat;

        const userChatWith = getUserChatWith(user, newChatData.users);

        const newChat = {
          ...newChatData,
          user: userChatWith,
          lastMessage: { ...newChatData.lastMessage, unRead: true },
        } as ChatModel;

        return newChat;
      });

      setChats(data);
    });

    unsubscribeRef.current = subscriber;

    return () => {
      unsubscribeRef.current?.();
    };
  }, [user]);

  useEffect(() => {
    const loadChats = async () => {
      const chats = await getUserChatsService({
        id: user?.id as string,
        name: user?.name as string,
        avatar: user?.avatar as string,
      });

      setChats(chats);
    };

    if (user) {
      loadChats().finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    isEmpty,
    isLoading,
    numberOfUnReadChats,
    chats,
    mutate: setChats,
    hasChatWith,
  };
};
