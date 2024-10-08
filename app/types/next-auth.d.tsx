// types/next-auth.d.ts

import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string; // Add the id property to the User object
  }

  interface Session {
    user: {
      id: string; // Add the id property to the user object
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
