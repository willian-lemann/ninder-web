import { useEffect, useState } from "react";
import { differenceInYears, toDate } from "date-fns";

import { getUsersService } from "@services/user/getUsersService";
import { User } from "@models/user";
import { addErrorNotification } from "@components/shared/alert";

import Image from "next/image";
import { Timestamp } from "firebase/firestore";

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const renderUserAgeLabel = (birthday: Timestamp) => {
    const age = differenceInYears(new Date(), birthday.toDate());
    return age;
  };

  const loadUsers = async () => {
    try {
      const response = await getUsersService();
      const { result } = response.data;

      setUsers(result);
    } catch (error) {
      addErrorNotification("Error trying to bring users");
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <section className="flex-1">
      <ul className="">
        {users.map((user) => (
          <li key={user.id} className="">
            <div className="h-[200px] object-cover relative rounded-md">
              <Image
                className="rounded-md"
                src={user.avatar as string}
                alt="user avatar"
                fill
              />
            </div>

            <div>
              <div>
                <strong className="m-0">{user.name},</strong>
                <span>{renderUserAgeLabel(user.birthday as Timestamp)}</span>
              </div>

              <p className="m-0 text-sm leading-3 text-zinc-400">
                10 kilometers away
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
