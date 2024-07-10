'use client';

import React, { useState } from 'react';
import styles from './ReviewsList.module.scss';
import Image from 'next/image';
import { Reviews } from '@/types/types';
import { RatingStar } from '../RatingStar';
import { AddReview } from './AddReview';

export const ReviewsList = ({
  reviews,
  placeId,
}: {
  reviews: Reviews[];
  placeId: string;
}) => {
  const [reviewList, setReviewList] = useState(reviews);

  return (
    <div id='reviews' className={styles.reviews}>
      <h3>Відгуки:</h3>
      <ul className={styles.ratings}>
        {reviewList.map((review) => (
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
      <div>
        <AddReview placeId={placeId} setReviewList={setReviewList} />
      </div>
    </div>
  );
};
