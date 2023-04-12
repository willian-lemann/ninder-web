import { useRouter } from "next/router";

import { ArrowLeftOnRectangleIcon as BackIcon } from "@heroicons/react/24/solid";

import { Chats } from "@/components/chat/Chats";
import { Messages } from "@/components/chat/Messages";
import { classNames } from "@/utils/classNames";
import { useChatsContext } from "@/context/chat";

export default function ChatPage() {
  const router = useRouter();
  const { isEmpty } = useChatsContext();

  const handleBack = () => {
    router.replace("/");
  };

  return (
    <div className="container overflow-hidden">
      <header className="h-[60px] flex items-center">
        <div className="flex items-center gap-4">
          <BackIcon
            height={24}
            width={24}
            className="cursor-pointer"
            onClick={handleBack}
          />
          <h1>Logo</h1>
        </div>
      </header>

      <main
        className={classNames(
          isEmpty ? "grid-cols-[1fr]" : "grid-cols-[1fr,2fr]",
          "grid auto-rows-[calc(100vh-60px)] divide-x"
        )}
      >
        {isEmpty ? null : (
          <section className="h-auto max-h-screen">
            <Chats />
          </section>
        )}

        <section className="h-[calc(100%-60px)]">
          <Messages />
        </section>
      </main>
    </div>
  );
}
