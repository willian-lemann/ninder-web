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
  const { user: currentUser } = useAuthContext();
  const { users, isLoading, isEmpty } = useUsers();

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

  const data =
    searchFilter.length > 0
      ? users?.filter((user) =>
          user.name.toLowerCase().includes(searchFilter.toLowerCase())
        )
      : users;

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
        {data.map((user) => {
          if (user.id === currentUser?.id) return null;

          return <UserCard key={user.id} user={user} toggleMap={toggleMap} />;
        })}
      </ul>
    </section>
  );
};
