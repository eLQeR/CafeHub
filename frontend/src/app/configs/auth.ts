import { API } from '@/services/apiRequests';
import type { NextAuthOptions } from 'next-auth';
import Credential from 'next-auth/providers/credentials';

export const authConfig: NextAuthOptions = {
  providers: [
    Credential({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const userToken = await API.getToken(
          credentials.email,
          credentials.password
        );
        console.log('userToken:', userToken);
        if (userToken.access) {
          const res = await API.getUserData(userToken.access);
          res.access = userToken.access;

          return res;
        } else {
          throw new Error('Невірний логін або пароль');
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
