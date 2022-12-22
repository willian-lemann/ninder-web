import { UserCard } from "./UserCard";

import { Skeleton } from "./Skeleton";
import { useAuthContext } from "@context/auth";
import { classNames } from "@utils/classNames";

import { useUsers } from "@context/users/useUsers";

interface UserListProps {
  toggleMap: boolean;
  searchFilter: string;
}

export const UserList = ({ toggleMap, searchFilter }: UserListProps) => {
  const { users, isLoading, isEmpty } = useUsers(searchFilter);

  if (isLoading) {
    return <Skeleton />;
  }

  if (isEmpty) {
    return (
      <div className="px-4 flex-1 flex flex-col items-center justify-center">
        <h1 className="text-xl text-zinc-400">Woh oh</h1>
        <p className="text-base text-zinc-400">No users found...</p>
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
