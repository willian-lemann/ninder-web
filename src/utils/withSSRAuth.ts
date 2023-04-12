import { getAuth } from "@clerk/nextjs/server";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getSession } from "next-auth/react";
import { parseCookies } from "nookies";
import { STORAGE_KEY } from "src/constants/login/auth";

export function withSSRAuth<P>(fn: GetServerSideProps<any>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { userId } = getAuth(context.req);

    if (!userId) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return await fn(context);
  };
}
