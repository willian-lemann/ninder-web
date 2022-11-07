import { Popover } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";

export const NotificationsPopover = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center justify-center outline-none">
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </Popover.Button>

      <Popover.Panel className="absolute w-[300px] h-52 z-[9999] right-0 shadow-lg bg-white rounded-md">
        <div className="p-4">
          <header>My notifications</header>

          <div className="flex flex-col overflow-auto h-auto max-h-[calc(13rem-66px)] ">
            <ul className="mt-2 divide-y-2 pr-8   flex flex-col gap-4">
              <li>Notification 1</li>
              <li>Notification 1</li>
              <li>Notification 1</li>
              <li>Notification 1</li>
              <li>Notification 1</li>
            </ul>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
