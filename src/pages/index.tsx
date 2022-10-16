import type { NextPage } from "next";

import { Header } from "@components/Header";
import { Map } from "@components/Map";
import { withSSRAuth } from "@utils/withSSRAuth";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen">
      <Header />

      <div className="flex justify-between h-[calc(100vh-4rem)] z-0">
        <section className="flex-1 p-8">apsodk</section>

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