'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import s from './Login.module.scss';
import { toast } from 'sonner';

export const Login = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.is_email_verified === false) {
      toast.warning('Активуйте Вашу Email адресу!');
    }
  }, [session]);

  return (
    <>
      {session?.user ? (
        <button
          onClick={() => signOut({ callbackUrl: '/', redirect: false })}
          className={s.login}
        >
          Вийти
        </button>
      ) : (
        <Link href={'/signin'} className={s.login}>
          Увійти
        </Link>
      )}
    </>
  );
};
