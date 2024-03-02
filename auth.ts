import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { GetUserDto, LoginDto } from "./DTOs/UserDTOs";
import axios from "axios";
import { Folder, User } from "@prisma/client";
import logger from "./lib/logger";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  providers: [
    credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          const { username, password } = credentials as z.infer<
            typeof LoginDto
          >;
          const data: z.infer<typeof GetUserDto> = { name: username };

          // const userRes = await getUserByInfo(data);
          // if (userRes.error) return null;
          // const user = userRes as User;

          // const folderRes = await getUserRootFolder(user.id);
          // if (folderRes.error) return null;
          // const userRootFolder = folderRes as Folder;

          const host = process.env.NEXT_PUBLIC_EXPRESS_HOST;
          const res = await axios.post(`http://${host}/api/user/fetch`, data);
          const user = res.data as User;
          console.log("user", user);
          const res2 = await axios.get(
            `http://${host}/api/folder/fetchUserRoot/${user.id}`
          );
          const userRootFolder = res2.data as Folder;
          console.log("userRootFolder", userRootFolder);

          return { ...user, rootFolderId: userRootFolder.id };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, credentials }) => {
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user && "rootFolderId" in user && user.rootFolderId) {
        token.rootFolderId = user.rootFolderId;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && token.sub && token.rootFolderId) {
        session.user.id = token.sub;
        session.user.rootFolderId = token.rootFolderId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  // debug: process.env.NODE_ENV === "development",
});
