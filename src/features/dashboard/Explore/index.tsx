import { classNames } from "@/utils/classNames";
import { useState } from "react";
import { Map } from "./Map";
import { UserList } from "./UserList";

export function Explore() {
  const [toggleMap, setToggleMap] = useState(false);

  return (
    <div className="flex justify-between md:h-[calc(100vh-4rem)] h-screen z-0 relative">
      <UserList toggleMap={toggleMap} />
      <Map toggleMap={toggleMap} />

      <button
        onClick={() => setToggleMap((state) => !state)}
        className={classNames(
          toggleMap ? "left-1/2 bottom-0 h-[45px]" : "right-0 top-12",
          "hidden md:flex absolute px-4 py-2 z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-full bg-primary text-white"
        )}
      >
        {toggleMap ? "Show Map" : "Hide Map"}
      </button>
    </div>
  );
}
