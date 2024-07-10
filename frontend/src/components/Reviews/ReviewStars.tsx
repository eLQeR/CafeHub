'use client';

import React, { useEffect, useState } from 'react';
import styles from './ReviewsList.module.scss';

type Props = {
  mark: number;
  setMark: React.Dispatch<React.SetStateAction<number>>;
};

export const ReviewStars: React.FC<Props> = ({ mark, setMark }) => {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(mark);

  useEffect(() => {
    setSelectedIndex(mark);
  }, [mark]);
  return (
    <ul className={styles.stars}>
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className={`${styles.button} ${
            index <= (hoverIndex || selectedIndex || 0) ? styles.hovered : ''
          }`}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(0)}
          onClick={() => {
            setSelectedIndex(index);
            setMark(index);
          }}
        >
          <svg
            height='25px'
            width='25px'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 43.128 43.128'
            className={styles.star}
          >
            <path
              d='M39.199,15.197H27.668L24.105,4.232c-1.404-4.326-3.68-4.326-5.084,0l-3.563,10.965H3.928 c-4.545,0-5.25,2.164-1.571,4.836l9.326,6.775L8.121,37.775c-1.404,4.322,0.438,5.662,4.116,2.988l9.326-6.775l9.328,6.775 c3.678,2.674,5.52,1.334,4.116-2.988l-3.564-10.967l9.326-6.775C44.449,17.361,43.744,15.197,39.199,15.197z'
              fill='none'
            ></path>
          </svg>
        </div>
      ))}
    </ul>
  );
};
