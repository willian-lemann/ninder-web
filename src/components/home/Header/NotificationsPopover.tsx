import { Popover } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";

export const NotificationsPopover = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center justify-center outline-none">
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </Popover.Button>

      <Popover.Panel className="absolute w-[300px] z-[9999] right-0 shadow-lg bg-white rounded-md">
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
    </Popover>
  );
};
