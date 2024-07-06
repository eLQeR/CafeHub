'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './ReviewsList.module.scss';
import { signIn, useSession } from 'next-auth/react';
import { REVIEW } from '@/services/reviews';
import { ReviewStars } from './ReviewStars';
import Link from 'next/link';
import { Reviews } from '@/types/types';
import { toast } from 'sonner';
type Props = {
  placeId: string;
  setReviewList: React.Dispatch<React.SetStateAction<Reviews[]>>;
};
export const AddReview: React.FC<Props> = ({ placeId, setReviewList }) => {
  const { data: session } = useSession();
  const [mark, setMark] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);
  const [fileLimitExceeded, setFileLimitExceeded] = useState(false);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    let formData = new FormData(formRef.current);
    formData.append('cafe', placeId);

    const res = await REVIEW.addReview(formData);
    if (res.id) {
      setReviewList((prev) => [res, ...prev]);
      formRef.current.reset();
      setMark(1);
      setFileLimitExceeded(false);
      toast.success('Дякуємо за Ваш відгук!');
    }
  };

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 5) {
      setFileLimitExceeded(true);
      event.target.value = '';
    } else {
      setFileLimitExceeded(false);
    }
  };

  return (
    <div className={styles['add-review']}>
      {session?.user ? (
        <div className={styles.container}>
          <h3 className={styles.title}>Додати новий відгук</h3>
          <form ref={formRef} onSubmit={submitHandler} className={styles.form}>
            <div className={styles.block}>
              <span className={styles.block__title}>Ваша оцінка закладу:</span>
              <input
                type='number'
                name='mark'
                placeholder='mark'
                min={1}
                max={5}
                step={1}
                value={mark}
                style={{ display: 'none' }}
                onChange={() => {}}
              ></input>
              <ReviewStars mark={mark} setMark={setMark} />
            </div>
            <div className={styles.block}>
              <span className={styles.block__title}>Розкажіть про заклад:</span>
              <textarea
                className={styles.block__description}
                name='description'
                placeholder='Було дуже ...'
              ></textarea>
            </div>
            <div className={styles.block}>
              <span className={styles.block__title}>Додайте фото:</span>
              <input
                type='file'
                name='images'
                multiple={true}
                accept='image/*,.png,.jpg,.gif,.web'
                onChange={fileChangeHandler}
              />
              {fileLimitExceeded && (
                <div className={styles.error}>
                  Ви можете завантажити не більше 5 файлів.
                </div>
              )}
            </div>
            <button
              type='submit'
              className={styles.form__submit}
              disabled={!session?.user.is_email_verified || fileLimitExceeded}
              onClick={() => {
                console.log('CLICk');
              }}
            >
              {session?.user.is_email_verified ? (
                <span>Додати відгук</span>
              ) : (
                <span>Потрібно веріфікувати Вашу Email адресу</span>
              )}
            </button>
          </form>
        </div>
      ) : (
        <Link className={styles.message} href={'/signin'}>
          Потрібно залогінитись для написання відгуків
        </Link>
      )}
    </div>
  );
};
