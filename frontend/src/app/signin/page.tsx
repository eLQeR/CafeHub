'use client';

import Link from 'next/link';
import s from './signin.module.scss';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const clearError = () => {
    setError(null);
    setEmailError(null);
    setPasswordError(null);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearError();

    if (data.email === '') {
      setEmailError('Email обов`язкове поле');
    }
    if (data.password === '') {
      setPasswordError('Password обов`язкове поле');
    } else if (
      emailError === null &&
      passwordError === null &&
      data.email.length > 0
    ) {
      const res = await signIn('credentials', { ...data, redirect: false });

      if (res && !res.error) {
        router.back();
      }

      if (res?.error) {
        setError(res.error);
      }
    }
  }

  return (
    <main>
      {session ? (
        <div className={s.container}>
          <h1 className={s.title}>Вже залогінелись!</h1>
          <h2 className={s.title}>{session.user.email}</h2>
          <button type='button' className={s.button} onClick={() => signOut()}>
            Вийти
          </button>
        </div>
      ) : (
        <div className={s.container}>
          <h1 className={s.title}>Вхід</h1>
          <form onSubmit={onSubmit} className={s.form} onChange={clearError}>
            <input
              className={classNames(s.input, {
                [s.war]: error,
                [s.war]: emailError,
              })}
              type='email'
              name='email'
              placeholder='E-mail'
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            ></input>
            <input
              className={classNames(s.input, {
                [s.war]: error,
                [s.war]: passwordError,
              })}
              type='password'
              name='password'
              placeholder='Password'
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            ></input>
            {error !== null && <h2 className={s.message__error}>{error}</h2>}
            {emailError !== null && (
              <h2 className={s.message__error}>{emailError}</h2>
            )}
            {passwordError !== null && (
              <h2 className={s.message__error}>{passwordError}</h2>
            )}
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
