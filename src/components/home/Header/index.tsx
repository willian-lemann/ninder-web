import { useState } from "react";
import { Disclosure } from "@headlessui/react";

import { MenuOptions } from "./MenuOptions";
import { MobileMenuOptions } from "./MobileMenuOptions";
import { MobileBarMenu } from "./MobileBarMenu";
import { SearchUsers } from "./SearchUsers";
import { NotificationsPopover } from "./NotificationsPopover";
import useSWR from "swr";

export const Header = () => {
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8 lg:w-full">
            <div className="relative flex h-16 items-center justify-between">
              <MobileBarMenu open={open} />

              <div className="flex w-full items-center justify-center sm:items-center sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <span className="text-2xl text-primary">Ninder</span>
                </div>

                <SearchUsers />

                <div className="absolute flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <NotificationsPopover />

                  <MenuOptions />
                </div>
              </div>
            </div>
          </div>

          <MobileMenuOptions />
        </>
      )}
    </Disclosure>
  );
};
