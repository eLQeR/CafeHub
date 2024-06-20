'use client';

import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export const Login = () => {
  const { data: session } = useSession();
  console.log('Status:', session);
  if (session?.user) {
    console.log('user:', session);
  }

  return (
    <div>
      {session?.user ? (
        // <Link href={'/api/auth/signin'}>Sign-In</Link>
        <button onClick={() => signOut({ callbackUrl: '/' })}>SIGN OUT</button>
      ) : (
        // <Link href={'/api/auth/signin'}>Sign-In</Link>
        <button onClick={() => signIn()}>SIGN IN</button>
      )}
    </div>
  );
};
