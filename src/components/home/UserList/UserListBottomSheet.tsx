import { useUsers } from "@context/users";
import Image from "next/image";
import { useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";

export function UserListBottomSheet() {
  const { users } = useUsers();
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <BottomSheet
      open
      ref={sheetRef}
      blocking={false}
      className="md:hidden"
      expandOnContentDrag
      header={<header>More than 100 users near</header>}
      snapPoints={() => [300, 600]}
    >
      <div className="h-full p-4">
        <ul className="grid grid-cols-3 place-items-center">
          {users.map((user) => {
            console.log(user.avatar);
            return (
              <li key={user.id} className=" flex flex-col items-center gap-2">
                <div className="relative h-20 w-20">
                  <Image
                    src={user.avatar ?? "/icons/avatar.svg"}
                    alt="user avatar"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h1>{user.name}</h1>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </BottomSheet>
  );
}
