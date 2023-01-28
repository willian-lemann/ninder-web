import { UserCard } from "./UserCard";

import { Skeleton } from "./Skeleton";
import { classNames } from "@utils/classNames";

import { useUsers, useUsersContext } from "@context/users";

interface UserListProps {
  toggleMap: boolean;
}

export const UserList = ({ toggleMap }: UserListProps) => {
  const { users, isLoading, isEmpty } = useUsersContext();

  if (isLoading) {
    return <Skeleton />;
  }

  if (isEmpty) {
    return (
      <div className="px-4 flex-1 flex flex-col items-center justify-center">
        <h1 className="text-xl text-zinc-400">Woah oh</h1>
        <p className="text-base text-zinc-400">No users found near you...</p>
      </div>
    );
  }

  return (
    <section
      className={classNames(
        toggleMap ? "container" : "",
        "px-4 overflow-y-auto flex-1"
      )}
    >
      <ul
        className={classNames(
          toggleMap ? "md:grid-cols-4" : "md:grid-cols-2",
          "md:grid gap-4 justify-items-center"
        )}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} toggleMap={toggleMap} />
        ))}
      </ul>
    </section>
  );
};
