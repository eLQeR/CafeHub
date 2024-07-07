'use client';

import React, { useState } from 'react';
import s from './SearchField.module.scss';
import { useRouter } from 'next/navigation';

export const SearchField = ({ style }: { style: string }) => {
  console.log(style);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue !== '') {
      router.push(`/search?name=${searchValue}`);
    }
  };

  return (
    <>
      <input
        type='text'
        placeholder='Пошук...'
        className={s[style]}
        value={searchValue}
        onKeyDown={(e) => keyDownHandler(e)}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      {style === 'hero' && <button className={s.hero__btn}>Пошук</button>}
    </>
  );
};
