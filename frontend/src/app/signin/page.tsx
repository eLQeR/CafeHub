'use client';

// import { AUTH } from '@/services/auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import AuthError from 'next-auth';
import s from './signin.module.scss';

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await signIn('credentials', { ...data, redirect: false });
      if (res && !res.error) {
        router.back();
      }
      console.log('res error', res?.error)
    } catch (error) {
      if (error instanceof AuthError) {
        console.log('error', error);
        // switch (error.type) {
        //   case 'CredentialsSignin':
        //     return 'Invalid credentials.';
        //   default:
        //     return 'Something went wrong.';
      }
    }
    // throw error;
    // }
  }

  return (
    <main>
      {session ? (
        <div className={s.container}>
          <h1 className={s.title}>Вже залогінелись</h1>
          <h2 className={s.title}>{session.user.email}</h2>
          <button type='button' className={s.button} onClick={() => signOut()}>
            Вийти
          </button>
        </div>
      ) : (
        <div className={s.container}>
          <h1 className={s.title}>Вхід</h1>
          <form onSubmit={onSubmit} className={s.form}>
            {/* <div> */}
            {/* <span>E-mail:</span> */}
            <input
              className={s.input}
              type='email'
              name='email'
              placeholder='E-mail'
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            ></input>
            {/* </div> */}
            {/* <div> */}
            {/* <span>Password:</span> */}
            <input
              className={s.input}
              type='password'
              name='password'
              placeholder='Password'
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            ></input>
            {/* </div> */}

            <button type='submit' className={s.button}>
              Увійти
            </button>
            <div className={s.message}>
              Не має аккаунта?{' '}
              <Link href={'/signup'} className={s.reg}>
                Регістрацїя
              </Link>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default SignIn;
