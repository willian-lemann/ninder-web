import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { getGender } from "@/functions/formatGender";

import { useUserDetails } from "@/context/users";
import { useAuthContext } from "@/context/auth";
import { useChatsContext } from "@/context/chat";

import { Loading } from "@/components/Loading";

import { Skeleton } from "@/components/user/Skeleton";

export default function UserDetails() {
  const { user: currentUser } = useAuthContext();
  const { query, back } = useRouter();
  const { user, isLoading } = useUserDetails(query.id as string);
  const { startNewChat } = useChatsContext();
  const [messageText, setMessageText] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="container h-screen w-screen">
      <div className="flex h-full">
        <section className="flex-1 flex flex-col items-center">
          <div className=" w-full flex items-start pt-10">
            <ArrowLeftIcon
              className="absolute h-8 w-8 cursor-pointer"
              onClick={() => back()}
            />

            <div className="flex flex-col items-center mx-auto">
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
      </div>
    </div>
  );
}
