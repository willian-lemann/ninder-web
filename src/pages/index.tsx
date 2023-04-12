import { Tab } from "@headlessui/react";

import { Header } from "@/features/dashboard/Header";

import { BottomNavigation } from "@/features/dashboard/BottomNavigation";
import { Explore } from "@/features/dashboard/Explore";
import { Favorites } from "@/features/dashboard/Favorites";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuth } from "@clerk/nextjs/server";

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
