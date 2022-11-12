import { withSSRAuth } from "@utils/withSSRAuth";

import { Header } from "@components/home/Header";
import { Map } from "@components/home/Map";
import { UserList } from "@components/home/UserList";
import { useState } from "react";

export default function Home() {
  const [toggleMap, setToggleMap] = useState(false);

  return (
    <div className="h-screen w-screen">
      <Header />

      <div className="flex justify-between h-[calc(100vh-4rem)] z-0 relative">
        <UserList toggleMap={toggleMap} />

        <button
          onClick={() => setToggleMap((state) => !state)}
          className="absolute px-4 z-[9999] -right-12 top-12 -translate-x-20 -translate-y-full rounded-md bg-primary text-white"
        >
          Map
        </button>

        <Map toggleMap={toggleMap} />
      </div>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (context) => {
  return {
    props: {},
  };
});
