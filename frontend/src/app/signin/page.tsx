'use client';

import { getToken } from '@/services/getPlaces';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

const page = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // console.log(event.currentTarget);
    // const formData = new FormData(event.currentTarget);
    // console.log('FD');
    // console.log('FD', formData.get('password'));
    // const formEmail = formData.get('email') as string;
    // const formPassword = formData.get('password') as string;

    // getToken(formEmail, formPassword);

    // console.log('RESP:', resp);
    console.log('DATA:', data);
    signIn('credentials', { ...data, redirect: false });
  }

  return (
    <main>
      <h1>SIGN IN PAGE</h1>
      <form onSubmit={onSubmit}>
        <div>
          <span>E-mail:</span>
          <input
            type='email'
            name='email'
            placeholder='E-mail'
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          ></input>
        </div>
        <div>
          <span>Password:</span>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          ></input>
        </div>

        <button type='submit'>Login</button>
      </form>
    </main>
  );
};

export default page;
