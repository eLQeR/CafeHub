'use client';

import React, { useState } from 'react';
import s from './SearchField.module.scss';
import { useRouter } from 'next/navigation';
import cn from 'classnames';

export const SearchField = ({ style }: { style: string }) => {
  const [searchValue, setSearchValue] = useState('');
  const [err, setErr] = useState(false);

  const router = useRouter();

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setErr(false);
    if (e.key === 'Enter' && searchValue !== '') {
      router.push(`/search?name=${searchValue}`);
    } else if (searchValue === '' && e.key === 'Enter') {
      setErr(true);
    }
  };

  const btnHandler = () => {
    setErr(false);
    if (searchValue !== '') {
      router.push(`/search?name=${searchValue}`);
    }
    if (searchValue === '') {
      setErr(true);
    }
  };

  return (
    <>
      <input
        type='text'
        placeholder='Пошук...'
        className={cn(s[style], {
          [s[style+'__war']]: err,
        })}
        value={searchValue}
        onKeyDown={(e) => keyDownHandler(e)}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      {style === 'hero' && (
        <button className={s.hero__btn} onClick={btnHandler}>
          Пошук
        </button>
      )}
    </>
  );
};
