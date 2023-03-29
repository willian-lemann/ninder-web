import { UserCard } from "./UserCard";

import { Skeleton } from "./Skeleton";
import { classNames } from "@utils/classNames";

import { useUsers } from "@context/users/useUsers";
import { UserListBottomSheet } from "./UserListBottomSheet";

interface UserListProps {
  toggleMap: boolean;
}

export const UserList = ({ toggleMap }: UserListProps) => {
  const { users, isLoading, isEmpty } = useUsers();

  if (!users || isLoading) {
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
    <div>
      <section
        className={classNames(
          toggleMap ? "container" : "",
          "md:px-4 md:overflow-y-auto md:flex-1 hidden md:flex"
        )}
      >
        <ul
          className={classNames(
            toggleMap ? "md:grid-cols-4" : "md:grid-cols-2",
            "md:grid gap-4 justify-items-center hidden"
          )}
        >
          {users.map((user) => (
            <UserCard key={user.id} user={user} toggleMap={toggleMap} />
          ))}
        </ul>
      </section>

      <UserListBottomSheet />
    </div>
  );
};
