import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connection } from "next/server";
import { cache } from "react";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { userRepository } from "./repositories/user_repository";
import { User } from "@/types";
import { AdapterUser } from "next-auth/adapters";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || typeof email !== "string") {
          return null;
        }
        if (!password || typeof password !== "string") {
          return null;
        }

        // check if user exists
        const foundUser = await db.query.user.findFirst({
          where: eq(user.email, email),
        });

        if (!foundUser) {
          return null;
        }

        // TODO: 之後加上密碼驗證

        return {
          id: String(foundUser.id),
          name: foundUser.display,
          email: foundUser.email,
          image: foundUser.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const getCurrentUser = cache(async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return userRepository.findById(Number(session.user.id));
});
