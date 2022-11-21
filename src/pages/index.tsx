import { withSSRAuth } from "@utils/withSSRAuth";

import { Header } from "@components/home/Header";
import { Map } from "@components/home/Map";
import { UserList } from "@components/home/UserList";
import { useEffect, useState } from "react";
import { classNames } from "@utils/classNames";

import { useUsersContext } from "@context/users";
import { getUsersService } from "@services/user/getUsersService";

export default function Home() {
  const [toggleMap, setToggleMap] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const { setUsers, setIsFetching } = useUsersContext();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getUsersService();
        const { result } = response.data;
        setUsers(result);
      } catch (error) {
      } finally {
        setIsFetching(false);
      }
    };

    loadUsers();
  }, [setIsFetching, setUsers]);

  return (
    <div className="h-screen w-screen">
      <Header />

      <div className="flex justify-between h-[calc(100vh-4rem)] z-0 relative">
        <UserList toggleMap={toggleMap} />
        <Map toggleMap={toggleMap} />
        <button
          onClick={() => setToggleMap((state) => !state)}
          className={classNames(
            toggleMap ? "left-1/2 bottom-0 h-[45px]" : "right-0 top-12",
            "absolute px-4 py-2 z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-full bg-primary text-white"
          )}
        >
          {toggleMap ? "Show Map" : "Hide Map"}
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (context) => {
  return {
    props: {},
  };
});
