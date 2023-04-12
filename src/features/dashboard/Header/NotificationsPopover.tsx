import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const NotificationsPopover = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="block hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 text-left w-full">
        <span className="relative">Notifications</span>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute w-[300px] z-20 right-full top-0 shadow-lg bg-white rounded-md">
          <div className="p-4">
            <ul className="divide-y pr-8 flex flex-col">
              <li className="py-3">Notification 1</li>
              <li className="py-3">Notification 1</li>
              <li className="py-3">Notification 1</li>
              <li className="py-3">Notification 1</li>
              <li className="py-3">Notification 1</li>
            </ul>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
