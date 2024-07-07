'use client';
import styles from './place.module.scss';
import { DetailsImages } from '@/components/DetailsImages';
import { getPlace } from '@/services/getPlaces';
import { useEffect, useState } from 'react';
import { DetailsPlace } from '@/types/types';
import { RatingStar } from '@/components/RatingStar';
import Link from 'next/link';
import { ReviewsList } from '@/components/Reviews';

export default function Page({ params }: { params: { slug: string } }) {
  const [place, setPlace] = useState<undefined | DetailsPlace>(undefined);
  const [mainImg, setMainImg] = useState('');

  useEffect(() => {
    getPlace(params.slug).then((data) => {
      setPlace(data);
      setMainImg(data.images[0].image);
    });
  }, [params.slug]);

  return (
    <>
      {place ? (
        <main className={styles.page__container}>
          <h1 className={styles.page__title}>{place.name}</h1>
          <section className={styles.page__top}>
            <div className={styles['page__top--column']}>
              <div className={styles.metro__div}>
                <span>
                  Адреса:{' '}
                  <Link href='#map' className={styles.metro__link}>
                    {' '}
                    {`${place.city} ${place.address}`}
                  </Link>
                </span>
              </div>

              <div className={styles.metro__div}>
                <span className={styles.metro__name}>
                  Метро: {place.metro.name}
                </span>
              </div>
            </div>
            <div className={styles['page__top--column']}>
              {' '}
              <div className={styles.mark}>
                <span>Рейтинг закладу:</span>
                <RatingStar mark={place.mark} />
              </div>
              <p>Середній чек: {place.medium_check} грн</p>
            </div>
          </section>

          <DetailsImages
            name={params.slug}
            images={place.images}
            mainImg={mainImg}
            setMainImg={setMainImg}
          />

          <section className={styles.page__info}>
            <div className={styles.page__left}>
              <p>Контакти:</p>
              <p>(044) 357 00 77 </p>
              <p>(099) 357 00 77 </p>
              <div className={styles['page__info--link']}>
                Сторінка закладу:{' '}
                <a
                  target='_blank'
                  href={place.cafe_url}
                  className={styles.page__link}
                >
                  {place.name}
                </a>
              </div>
            </div>
            <div className={styles.page__right}>
              <div className={styles['page__right--features']}>
                <p>Особливості:</p>
                {place.features.map((feature) => (
                  <Link
                    key={feature.id}
                    href={`/places?feature_ids=${feature.id}`}
                    className={styles.page__link}
                  >
                    {feature.name}
                  </Link>
                ))}
              </div>
              <div className={styles['page__right--features']}>
                Кухня:{' '}
                <Link
                  href={`/places?cuisine_ids=${place.cuisine.id}`}
                  className={styles.page__link}
                >
                  {place.cuisine.name}
                </Link>
              </div>
            </div>
          </section>
          <section className={styles.page__description}>
            <h3>Опис:</h3>
            <div className={styles.tabs__content}>
              <div
                className={styles.tabs__description}
                dangerouslySetInnerHTML={{ __html: place.description }}
              ></div>
            </div>
          </section>
          <ReviewsList reviews={place.reviews} placeId={params.slug} />
          <section id='map'>
            <iframe
              src={place.google_address_url}
              width='100%'
              height='600'
              style={{ border: 'none' }}
              loading='lazy'
            ></iframe>
          </section>
        </main>
      ) : (
        <main> Loading...</main>
      )}
    </>
  );
}
