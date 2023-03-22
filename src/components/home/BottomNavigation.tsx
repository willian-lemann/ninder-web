import { MapIcon as MapIconOutline } from "@heroicons/react/24/outline";
import { MapIcon } from "@heroicons/react/24/solid";

import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIcon } from "@heroicons/react/24/solid";

import { BellIcon as NotificationIconOutline } from "@heroicons/react/24/outline";
import { BellIcon as NotificationIcon } from "@heroicons/react/24/solid";

import { ChatBubbleLeftIcon as ChatIconOutline } from "@heroicons/react/24/outline";
import { ChatBubbleLeftIcon as ChatIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { classNames } from "@utils/classNames";

type Navigation = "explore" | "favorites" | "notifications" | "messages";

export function BottomNavigation() {
  const [selectedNavigation, setSelectedNavigation] =
    useState<Navigation>("explore");

  return (
    <div className="md:hidden border-t-2 shadow-lg z-50 h-16 w-full absolute bottom-0">
      <ul className="h-full flex items-center justify-around px-4 text-sm font-bold">
        <li
          onClick={() => setSelectedNavigation("explore")}
          className="flex flex-col items-center"
        >
          {selectedNavigation === "explore" ? (
            <MapIcon className="h-6 w-6 text-primary animate-fadeIn" />
          ) : (
            <MapIconOutline className="h-6 w-6" />
          )}

          <p
            className={classNames(
              selectedNavigation === "explore"
                ? "text-primary"
                : "text-zinc-600",
              "transition-all duration-300"
            )}
          >
            Explore
          </p>
        </li>

        <li
          onClick={() => setSelectedNavigation("favorites")}
          className="flex flex-col items-center"
        >
          {selectedNavigation === "favorites" ? (
            <HeartIcon className="h-6 w-6 text-primary animate-fadeIn" />
          ) : (
            <HeartIconOutline className="h-6 w-6" />
          )}

          <p
            className={classNames(
              selectedNavigation === "favorites"
                ? "text-primary"
                : "text-zinc-600",
              "transition-all duration-300"
            )}
          >
            Favorites
          </p>
        </li>

        <li
          onClick={() => setSelectedNavigation("notifications")}
          className="flex flex-col items-center"
        >
          {selectedNavigation === "notifications" ? (
            <NotificationIcon className="h-6 w-6 text-primary animate-fadeIn" />
          ) : (
            <NotificationIconOutline className="h-6 w-6" />
          )}

          <p
            className={classNames(
              selectedNavigation === "notifications"
                ? "text-primary"
                : "text-zinc-600",
              "transition-all duration-300"
            )}
          >
            Notifications
          </p>
        </li>

        <li
          onClick={() => setSelectedNavigation("messages")}
          className="flex flex-col items-center"
        >
          {selectedNavigation === "messages" ? (
            <ChatIcon className="h-6 w-6 text-primary animate-fadeIn" />
          ) : (
            <ChatIconOutline className="h-6 w-6" />
          )}

          <p
            className={classNames(
              selectedNavigation === "messages"
                ? "text-primary"
                : "text-zinc-600",
              "transition-all duration-300"
            )}
          >
            Messages
          </p>
        </li>
      </ul>
    </div>
  );
}
