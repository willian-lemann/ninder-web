import { UserCard } from "./UserCard";

import { useUsers } from "@context/users/useUsers";
import { Skeleton } from "./Skeleton";
import { useAuthContext } from "@context/auth";
import { classNames } from "@utils/classNames";

interface UserListProps {
  toggleMap: boolean;
}

export const UserList = ({ toggleMap }: UserListProps) => {
  const { user: currentUser } = useAuthContext();
  const { data } = useUsers();

  if (!data) {
    return <Skeleton />;
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
        {data.map((user) => {
          if (user.id === currentUser?.id) return null;

          return (
            <>
              <UserCard key={user.id} user={user} toggleMap={toggleMap} />
              <UserCard key={user.id} user={user} toggleMap={toggleMap} />
              <UserCard key={user.id} user={user} toggleMap={toggleMap} />
            </>
          );
        })}
      </ul>
    </section>
  );
};
