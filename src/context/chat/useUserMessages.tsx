import { useEffect } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "@config/firebase";

import useSWR from "swr";
import { getMessagesService } from "@services/chat/getMessagesService";
import { Message } from "@models/message";

interface UseUserMessagsParams {
  chatId: string;
}

export const useUserMessages = ({ chatId }: UseUserMessagsParams) => {
  const { data, error, mutate } = useSWR(`/messages/${chatId}`, () =>
    getMessagesService(chatId).then((message) => message)
  );

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");

    const sub = onSnapshot(messagesRef, (docSnap) => {
      docSnap.forEach((doc) => {
        if (data) {
          const newMessage = { ...doc.data(), id: doc.id } as Message;
          mutate([...data, newMessage], false);
        }
      });
    });

    return sub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    error,
    mutate,
    isLoading: !data,
    messages: data,
  };
};
