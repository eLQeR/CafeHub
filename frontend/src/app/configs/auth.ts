import { getToken } from '@/services/getPlaces';
import type { NextAuthOptions, User } from 'next-auth';
import Credential from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';

// const USERS = [
//   {
//     id: '0',
//     email: 'ptb@bk.com',
//     password: '123',
//     image: '/public/mockData/1.jpg',
//   },
//   {
//     id: '1',
//     email: 'yashopua@gmail.com',
//     password: '123456',
//     image: '/public/mockData/2.jpg',
//   },
//   {
//     id: '2',
//     email: 'ptb19@bk.com',
//     password: '123',
//     image: '/public/mockData/3.jpg',
//   },
// ];

export const authConfig: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    Credential({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          required: true,
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const userToken = await getToken(
          credentials.email,
          credentials.password
        );
        console.log('userToken:', userToken);

        const user = {
          email: credentials.email,
        };

        return userToken;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  // callbacks: {
  //   async session({ session, token }) {
  //     console.log('1', session);
  //     if (session.user) {
  //       session.user.name = 'test';
  //     }
  //     console.log('2', session);
  //     return session;
  //   },
  // },
};
