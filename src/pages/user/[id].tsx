import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { getGender } from "@functions/formatGender";

import { useUserDetails } from "@context/users";
import { useAuthContext } from "@context/auth";
import { useChatsContext } from "@context/chat";

import { Loading } from "@components/shared/Loading";
import { UserDTO } from "@data/dtos";

export default function UserDetails() {
  const { user: currentUser } = useAuthContext();
  const { query } = useRouter();
  const { user, isLoading } = useUserDetails(query.id as string);
  const { startChat } = useChatsContext();
  const [messageText, setMessageText] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleStartConversation = async (talkingUser: UserDTO) => {
    setIsSendingMessage(true);

    await startChat({
      userId: currentUser?.id as string,
      messageText,
      talkingUser,
    });

    setIsSendingMessage(false);
  };

  if (isLoading) return <p>loading...</p>;

  return (
    <div className="container h-screen w-screen">
      <div className="flex h-full">
        <section className="flex-1 flex flex-col items-center">
          <div className="flex flex-col items-center mt-10 ">
            <div className="relative h-[100px] w-[100px] object-cover rounded-full border-4 border-black">
              <Image
                src={user.avatar as string}
                alt="user avatar"
                fill
                className="rounded-full"
              />
            </div>

            <div className="mt-4 flex gap-1">
              <strong>{user.name}</strong>
              <p>
                {user.hometown}, <span>{user.nationality}</span>
              </p>
            </div>
          </div>

          <div className="p-4 w-full">
            <p>{user.email}</p>
            <p>{getGender(user.gender as number)}</p>
            <p>{user.occupation}</p>
            <div>
              <strong>Phone number:</strong>
              <span>{user.phone}</span>
            </div>
          </div>

          <p className="max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            officiis totam distinctio quo velit perspiciatis ex officia
            dignissimos. Facilis amet blanditiis modi perspiciatis mollitia.
            Quibusdam, voluptates mollitia! Voluptate, vel deserunt! Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Ipsam officiis totam
            distinctio quo velit perspiciatis ex officia dignissimos. Facilis
            amet blanditiis modi perspiciatis mollitia. Quibusdam, voluptates
            mollitia! Voluptate, vel deserunt! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ipsam officiis totam distinctio quo
            velit perspiciatis ex officia dignissimos. Facilis amet blanditiis
            modi perspiciatis mollitia. Quibusdam, voluptates mollitia!
            Voluptate, vel deserunt!
          </p>
        </section>

        <section className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <span className="self-start">
              Say something to <strong>{user.name}</strong>
            </span>

            <textarea
              name="message-text"
              id="message-text"
              placeholder="type here..."
              className="h-52 w-full px-3 py-2 mt-4 outline-none border rounded-md resize-none"
              value={messageText}
              onChange={({ target }) => setMessageText(target.value)}
            />

            <button
              onClick={() =>
                handleStartConversation({
                  id: user.id as string,
                  name: user.name as string,
                  avatar: user.avatar as string,
                })
              }
              className="rounded-md mt-4 flex justify-center self-end bg-primary text-white px-4 py-2 w-52 hover:brightness-90 transition-[filter] duration-300"
            >
              {isSendingMessage ? <Loading /> : "Send Message"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
