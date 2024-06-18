import type { AuthOptions, User } from 'next-auth';
import Credential from 'next-auth/providers/credentials';

const USERS = [
  {
    id: '0',
    email: 'ptb@bk.com',
    password: '123',
    img: '/public/mockData/1.jpg',
  },
  {
    id: '1',
    email: 'yashopua@gmail.com',
    password: '123',
    img: '/public/mockData/2.jpg',
  },
  {
    id: '2',
    email: 'ptb19@bk.com',
    password: '123',
    img: '/public/mockData/3.jpg',
  },
];
export const authConfig: AuthOptions = {
  providers: [
    Credential({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const currentUser = USERS.find(
          (user) => user.email === credentials.email
        );

        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...userWithOutPassword } = currentUser;
          console.log(userWithOutPassword);
          return userWithOutPassword as User;
        }

        return null;
      },
    }),
  ],
};
