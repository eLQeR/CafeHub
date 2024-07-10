'use client';

import Link from 'next/link';
import s from './signup.module.scss';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { API_URL } from '@/services/constants';
import { toast } from 'sonner';

const SignUp = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
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
      toast.error('Email обов`язкове поле');
    }
    if (data.password === '') {
      setPasswordError('Password обов`язкове поле');
      toast.error('Password обов`язкове поле');
    }
    if (data.password !== '' && data.password.length < 5) {
      setPasswordError('Password мінімум 5 символів');
      toast.error('Password мінімум 5 символів');
    }
    if (
      emailError === null &&
      passwordError === null &&
      data.password !== '' &&
      data.email !== '' &&
      data.password.length > 5
    ) {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/user/register/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const userInfo = await res.json();

        if (!res.ok) {
          if (userInfo.email) {
            setEmailError('Користувач з таким email вже існує.');
            toast.error('Користувач з таким email вже існує.');
          }
          if (userInfo.password) {
            setPasswordError('Password мінімум 5 символів');
            toast.error('Password мінімум 5 символів');
          }
        } else if (userInfo.id) {
          toast.success('Ви успішно зареєструвались');
          router.push('/signin');
        }
      } catch (error) {
        console.log('ERR:', error);
        setError('Помилка серверу. Спробуйте ще раз пізніше.');
        toast.error('Помилка серверу. Спробуйте ще раз пізніше.');
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <main>
      <div className={s.container}>
        <h1 className={s.title}>Реєстрація</h1>
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
            <h3 className={s.message__error}>{emailError}</h3>
          )}
          {passwordError !== null && (
            <h2 className={s.message__error}>{passwordError}</h2>
          )}
          <div className={s.warning}>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='12' cy='17' r='1' fill='#ff8000'></circle>
              <path
                d='M12 10L12 14'
                stroke='#ff8000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                d='M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z'
                stroke='#ff8000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
            <p>
              Після реестрації, активуйте свій аккаунт щоб мати змогу додавати
              відгуки закладам
            </p>
          </div>
          <button type='submit' className={s.button} disabled={isLoading}>
            Реєстрація
          </button>
          <div className={s.message}>
            Маєш аккаунт?{' '}
            <Link href={'/signin'} className={s.reg}>
              Увійти
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
