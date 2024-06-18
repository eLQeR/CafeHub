'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export const Login = () => {
  const session = useSession();
  console.log('Status:', session.status);
  if (session.data?.user) {
    console.log('user:', session);
  }

  return (
    <div>
      <Link href={'/api/auth/signin'}>Sign-In</Link>
    </div>
  );
};
