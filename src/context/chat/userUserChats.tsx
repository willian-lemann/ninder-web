import useSWR from "swr";
import { useAuthContext } from "@context/auth";

import { getUserChatsService } from "@services/chat/getUserChatsService";
import { UserChat, UserChatModel } from "@models/user-chat";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { firestore } from "@config/firebase";
import { Message, MessageModel } from "@models/message";
import { Chat, ChatModel, ReceiverModel, SenderModel } from "@models/chat";
import { useEffect, useState } from "react";

async function getUserChat(document: QueryDocumentSnapshot<DocumentData>) {
  const userChat = document.data() as UserChat;

  const messageRef = doc(firestore, "messages", userChat.messageId);
  const messageDocsnap = await getDoc(messageRef);

  const message = {
    ...messageDocsnap.data(),
    id: messageDocsnap.id,
  } as Message;

  const senderRef = doc(firestore, "users", message.senderId);
  const senderDocSnap = await getDoc(senderRef);

  const receiverRef = doc(firestore, "users", message.receiverId);
  const receiverDocSnap = await getDoc(receiverRef);

  const sender = {
    ...senderDocSnap.data(),
    id: senderDocSnap.id,
  } as SenderModel;
  const receiver = {
    ...receiverDocSnap.data(),
    id: receiverDocSnap.id,
  } as ReceiverModel;

  const messageModel = { ...message, sender, receiver } as MessageModel;

  const chatRef = doc(firestore, "chats", userChat.chatId);
  const chatDocSnap = await getDoc(chatRef);

  const chat = { ...chatDocSnap.data(), id: chatDocSnap.id } as Chat;

  const chatModel = { ...chat, receiver, sender } as ChatModel;

  const mappedUserChat = {
    chat: chatModel,
    message: messageModel,
  } as UserChatModel;

  return mappedUserChat;
}

export const useUserChats = () => {
  const [userChats, setUserChats] = useState([]);
  const chatUsersRef = collection(firestore, "user-chats");

  useEffect(() => {
    const sub = onSnapshot(chatUsersRef, (docSnap) => {
      docSnap.forEach(async (doc) => {
        const teste = await getUserChat(doc);

        // setUserChats((state) => [...state, teste]);
      });
    });

    return sub;
  }, [chatUsersRef, userChats]);

  return {
    data: userChats,
  };
};
