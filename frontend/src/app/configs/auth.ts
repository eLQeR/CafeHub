import { AUTH } from '@/services/auth';
import { error } from 'console';
import type { NextAuthOptions } from 'next-auth';
import Credential from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';

export const authConfig: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    Credential({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error(
            '111Unauthorized access: User does not have admin privileges.'
          );
        // return null;

        const userToken = await AUTH.getToken(
          credentials.email,
          credentials.password
        );
        console.log('userToken:', userToken);
        if (userToken.access) {
          const res = await AUTH.getUserData(userToken.access);
          res.access = userToken.access;

          return res;
        } else {
          // return null;
          // throw error;
          throw new Error(userToken.detail);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) {
        session.user.is_email_verified = token.uid.is_email_verified;
        session.user.access = token.uid.access;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};
