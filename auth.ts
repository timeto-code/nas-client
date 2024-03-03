import { Folder, User } from "@prisma/client";
import axios from "axios";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { GetUserDto, LoginDto } from "./DTOs/UserDTOs";
import { env } from "./utils/env.confi";

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
        console.log("credentials", credentials);

        try {
          const { username, password } = credentials as z.infer<
            typeof LoginDto
          >;
          const data: z.infer<typeof GetUserDto> = { name: username };

          const jwtRes = await axios.get("/api/auth/jwt");
          if (jwtRes.status !== 200) return null;
          const { jwt } = jwtRes.data;
          console.log("jwt 生成成功");

          const host = env.NEXT_PUBLIC_EXPRESS_HOST;
          const userRes = await axios.post(
            `http://${host}/api/user/fetch`,
            data,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
              },
            }
          );
          const { user } = userRes.data as { user: User };
          console.log(`用户获取成功 [${user.id}]`);

          const folderRes = await axios.get(
            `http://${host}/api/folder/fetchUserRoot/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
              },
            }
          );
          const { folder } = folderRes.data as { folder: Folder };
          console.log(`用户根目录获取成功 [${folder.id}]`);

          return { ...user, rootFolderId: folder.id };
        } catch (error) {
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
  basePath: "/api/auth",
  trustHost: true,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  // debug: process.env.NODE_ENV === "development",
});
