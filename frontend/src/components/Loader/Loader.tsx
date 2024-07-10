import React from 'react';
import { Roller } from 'react-css-spinners';
import s from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={s.container}>
      <Roller color='rgba(245,166,35,1)' size={166} />
    </div>
  );
};
