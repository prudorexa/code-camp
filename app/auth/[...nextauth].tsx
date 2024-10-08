// /app/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ensure environment variables are set and assert their types
const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const facebookClientId = process.env.FACEBOOK_CLIENT_ID as string;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET as string;
const nextAuthSecret = process.env.NEXTAUTH_SECRET as string;

if (
  !googleClientId || 
  !googleClientSecret || 
  !facebookClientId || 
  !facebookClientSecret || 
  !nextAuthSecret
) {
  throw new Error("Please define all required environment variables");
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    FacebookProvider({
      clientId: facebookClientId,
      clientSecret: facebookClientSecret,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: nextAuthSecret,
  callbacks: {
    async session({ session, token }) {
      // Check if session.user exists before assigning id
      if (session.user) {
        session.user.id = token.id as string; // Assert the type here as well
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string; // Assert the type here as well
      }
      return token;
    },
  },
});
