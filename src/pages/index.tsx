import type { NextPage } from "next";
import { withSSRAuth } from "@utils/withSSRAuth";

import { Header } from "@components/home/Header";
import { Map } from "@components/home/Map";
import { UserList } from "@components/home/UserList";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen">
      <Header />

      <div className="flex justify-between h-[calc(100vh-4rem)] z-0">
        <UserList />

        <Map />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = withSSRAuth(async (context) => {
  return {
    props: {},
  };
});
