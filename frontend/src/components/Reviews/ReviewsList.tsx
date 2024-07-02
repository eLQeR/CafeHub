'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import styles from './ReviewsList.module.scss';
import { Reviews } from '@/types/types';
import Image from 'next/image';
import { RatingStar } from '../RatingStar';

export const ReviewsList = ({ reviews }: { reviews: Reviews[] }) => {
  const { data: session } = useSession();

  console.log('Reviews SESSION:', session?.user.is_email_verified);
  return (
    <div>
      Reviews
      <ul className={styles.ratings}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.row}>
            <div className={styles.rating}>
              <div className={styles.rating__avatar}>
                {review.description.slice(0, 2)}
              </div>
              <div className={styles.rating__content}>
                <RatingStar mark={review.mark} />
                <span>{review.description}</span>
              </div>
            </div>

            <div className={styles.rating__images}>
              {review.images.map((image) => (
                <div className={styles.rating__photo} key={image.image}>
                  <Image
                    src={image.image}
                    fill
                    alt={image.image}
                    objectFit='cover'
                  />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
