import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      is_email_verified: boolean;
    };
  }

  interface User {
    id: number;
    email: string;
    is_staff: boolean;
    is_email_verified: boolean;
  }

  interface JWT {
    uid: User;
  }
}
