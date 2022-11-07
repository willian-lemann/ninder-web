import type { NextPage } from "next";
import { withSSRAuth } from "@utils/withSSRAuth";

import { Header } from "@components/home/Header";
import { Map } from "@components/home/Map";
import { UserList } from "@components/home/UserList";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Header />

      <div className="flex justify-between h-[calc(100vh-4rem)] z-0">
        <UserList />
        <Map />
      </div>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (context) => {
  return {
    props: {},
  };
});
