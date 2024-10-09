import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt', // Corrected 'Session' to 'session'
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user by email
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        // Check if user exists and has a password
        if (!existingUser || !existingUser.password) {
          return null;
        }

        // Compare passwords
        const passwordMatch = await compare(credentials.password, existingUser.password);

        if (!passwordMatch) {
          return null;
        }

        // Return user object with defaults for nullable fields
        return {
          id: `${existingUser.id}`,
          username: existingUser.username || '', // Ensure username is a string
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            username: token.username || '', // Ensure username is a string
          },
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username || '', // Add username to token with default value
        };
      }
      return token;
    },
  },
};
