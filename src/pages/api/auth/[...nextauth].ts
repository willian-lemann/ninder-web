import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string;
const SECRET = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET as string;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: SECRET,
});
