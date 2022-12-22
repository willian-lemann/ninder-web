import Image from "next/image";
import Router from "next/router";
import { classNames } from "@utils/classNames";

import { BookmarkIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon as OutlinedBookmarkIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { useFavoriteUsers } from "@context/users/useFavoriteUsers";

interface FavoritesPopoverProps {
  numberOfFavorites: number;
}

export const FavoritesPopover = ({
  numberOfFavorites,
}: FavoritesPopoverProps) => {
  const { favoriteUsers, favorite, isEmpty, checkUserIsFavorited } =
    useFavoriteUsers();

  const handleNavigate = (path: string) => {
    Router.push(path);
  };

  return (
    <Popover className="relative">
      <Popover.Button
        disabled={numberOfFavorites === 0}
        as="button"
        className={classNames(
          "block hover:bg-gray-200 px-4 py-2 text-left w-full"
        )}
      >
        <span className="text-sm text-gray-700 relative">
          Favorites
          {numberOfFavorites > 0 ? (
            <span className="absolute -right-4 -top-1 bg-primary rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
              {numberOfFavorites}
            </span>
          ) : null}
        </span>
      </Popover.Button>

      {isEmpty ? null : (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 -left-[135%]">
            <div className="bg-white h-auto w-64 rounded-md py-4 px-6">
              <ul>
                {favoriteUsers?.map((favoriteUser) => (
                  <li
                    key={favoriteUser?.id}
                    className="flex justify-between group mb-4 last:mb-0 cursor-pointer"
                    onClick={() => handleNavigate(`/user/${favoriteUser.id}`)}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 relative">
                        <Image src="/icons/avatar.svg" alt="user avatar" fill />
                      </div>

                      <div className="leading-5 pl-2">
                        <strong>{favoriteUser?.name}</strong>
                        <p className="">{favoriteUser?.hometown}</p>
                      </div>
                    </div>

                    {checkUserIsFavorited(favoriteUser.id as string) ? (
                      <BookmarkIcon
                        className="h-4 w-4 cursor-pointer text-primary"
                        onClick={(event) =>
                          favorite(event, favoriteUser.id as string)
                        }
                      />
                    ) : (
                      <OutlinedBookmarkIcon
                        className="h-4 w-4 cursor-pointer"
                        onClick={(event) =>
                          favorite(event, favoriteUser.id as string)
                        }
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Popover.Panel>
        </Transition>
      )}
    </Popover>
  );
};
