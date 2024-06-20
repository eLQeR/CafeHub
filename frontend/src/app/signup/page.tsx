'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

const page = () => {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event.currentTarget);
    const formData = new FormData(event.currentTarget);
    // console.log('FD', formData);
    const response = await fetch('http://localhost:8000/api/user/register/', {
      method: 'POST',
      body: formData,
    });

    // Handle response if necessary
    const data = await response.json();
    // ...
    if (data.id) {
      router.push('/signin');
    }
  }

  return (
    <main>
      <h1>SIGN UP FORM</h1>
      <form onSubmit={onSubmit}>
        <div>
          <span>E-mail:</span>
          <input type='email' name='email' placeholder='E-mail'></input>
        </div>
        <div>
          <span>Password:</span>
          <input type='password' name='password' placeholder='Password'></input>
        </div>

        <button type='submit'>Registration</button>
      </form>
    </main>
  );
};

export default page;
