import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      is_email_verified: boolean;
      access: string;
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

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    uid: User;
  }
}
