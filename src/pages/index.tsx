import { useState } from "react";

import { Tab } from "@headlessui/react";

import { withSSRAuth } from "@utils/withSSRAuth";

import { Header } from "@components/home/Header";

import { BottomNavigation } from "@components/home/BottomNavigation";
import { Explore } from "@components/home/Explore";
import { Favorites } from "@components/home/Favorites";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Header />

      <Tab.Group>
        <Tab.Panels>
          <Tab.Panel>
            <Explore />
          </Tab.Panel>

          <Tab.Panel>
            <Favorites />
          </Tab.Panel>

          <Tab.Panel>Content 3</Tab.Panel>
          <Tab.Panel>Content 4</Tab.Panel>
        </Tab.Panels>

        <BottomNavigation />
      </Tab.Group>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (context) => {
  return {
    props: {},
  };
});
