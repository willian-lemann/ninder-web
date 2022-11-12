import { UserCard } from "./UserCard";

import { useUsers } from "@context/users/useUsers";
import { Skeleton } from "./Skeleton";
import { useAuthContext } from "@context/auth";

export const UserList = () => {
  const { user: currentUser } = useAuthContext();
  const { data } = useUsers();

  if (!data) {
    return <Skeleton />;
  }

  return (
    <section className="flex-1 p-4">
      <ul className="md:grid md:grid-cols-2 gap-4">
        {data.map((user) => {
          if (user.id === currentUser?.id) return null;
          
          return <UserCard key={user.id} user={user} />;
        })}
      </ul>
    </section>
  );
};
