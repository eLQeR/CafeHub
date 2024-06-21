'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const page = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('http://localhost:8000/api/user/register/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const userInfo = await response.json();

    if (userInfo.id) {
      router.push('/signin');
    }
  }

  return (
    <main>
      <h1>REGISTRATION FORM</h1>
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

        <button type='submit'>Registration</button>
      </form>
    </main>
  );
};

export default page;
