import Image from 'next/image';
import React from 'react';
import styles from './RatingStar.module.scss';

export const RatingStar = ({ mark }: { mark: number }) => {
  const STAR_COUNT = 5;

  return (
    <div className={styles.ratingStart__stars}>
      <div
        className={styles.ratingStart__stars__bg}
        style={{ width: `${mark * 20}%` }}
      ></div>
      {Array.from({ length: STAR_COUNT }).map((_, index) => (
        <Image
          key={index}
          src={'/img/star.png'}
          className={styles.ratingStart__star}
          width={25}
          height={25}
          alt='star'
        />
      ))}
    </div>
  );
};
