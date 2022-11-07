import { useEffect, useState } from "react";

import { User } from "@models/user";
import { getUsersService } from "@services/user/getUsersService";
import { addErrorNotification } from "@components/shared/alert";

import { UserCard } from "./UserCard";

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

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
    <section className="flex-1 p-4">
      <ul className="md:grid md:grid-cols-2 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </section>
  );
};
