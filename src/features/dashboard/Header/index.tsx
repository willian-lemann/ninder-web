import { Disclosure } from "@headlessui/react";

import { MenuOptions } from "./MenuOptions";
import { MobileMenuOptions } from "./MobileMenuOptions";
import { MobileBarMenu } from "./MobileBarMenu";
import { SearchUsers } from "./SearchUsers";
import Image from "next/image";

export const Header = () => {
  return (
    <Disclosure as="nav" className="bg-white container hidden md:inline-block">
      {({ open }) => (
        <>
          <div className="lg:w-full">
            <div className="relative flex h-16 items-center justify-between">
              <MobileBarMenu open={open} />

              <div className="flex w-full items-center justify-center sm:items-center sm:justify-between">
                <div className="relative h-8 w-28 hidden md:inline-block">
                  <Image src="/logo.svg" alt="logo" fill />
                </div>

                <SearchUsers />

                <div className="flex absolute items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
