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
    const cookies = parseCookies(context);
    const session = await getSession(context);

    if (!cookies[STORAGE_KEY] && !session) {
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
