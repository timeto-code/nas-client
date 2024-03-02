import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      rootFolderId?: string;
    } & DefaultSession["user"]; // To keep the default types
  }
}
