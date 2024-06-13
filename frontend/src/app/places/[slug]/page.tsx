'use client';
import styles from './place.module.scss';
import { DetailsImages } from '@/components/DetailsImages';
import { getPlace } from '@/services/getPlaces';
import { useEffect, useState } from 'react';
import { DetailsPlace } from '@/types/types';
import Image from 'next/image';
import { RatingStar } from '@/components/RatingStar';
import classNames from 'classnames';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string } }) {
  const [place, setPlace] = useState<undefined | DetailsPlace>(undefined);
  const [tab, setTab] = useState(1);
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
                  <Link href='#map' className={styles.metro__link}> {`${place.city} ${place.address}`}</Link>
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
            <div className={styles['page__column']}>
              <p>Контакти:</p>
              <p>(044) 357 00 77 </p>
              <p>(099) 357 00 77 </p>
              <br></br>
              <p>
                Кухня:{' '}
                <Link
                  href={`/places?cuisine=${place.cuisine.id}`}
                  className={styles.page__link}
                >
                  {place.cuisine.name}
                </Link>
              </p>
            </div>
            <div
              className={classNames(
                styles['page__column'],
                styles['page__column--right']
              )}
            >
              <p>Особливості:</p>
              <div className={styles['page__column--features']}>
                {place.features.map((feature) => (
                  <Link
                    key={feature.id}
                    href={`/places?features=${feature.id}`}
                    className={styles.page__link}
                  >
                    {feature.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <section className={styles.page__description}>
            <div className={styles.tabs}>
              <button
                className={classNames([styles['tabs__btn']], {
                  [styles['tabs__btn--active']]: tab === 1,
                })}
                onClick={() => {
                  setTab(1);
                }}
              >
                Опис
              </button>
              <button
                className={classNames([styles['tabs__btn']], {
                  [styles['tabs__btn--active']]: tab === 2,
                })}
                onClick={() => {
                  setTab(2);
                }}
              >
                Відгуки (<b>{place.reviews.length}</b>)
              </button>
            </div>
            <div className={styles.tabs__content}>
              {tab === 1 ? (
                <div
                  className={styles.tabs__description}
                  dangerouslySetInnerHTML={{ __html: place.description }}
                ></div>
              ) : (
                <ul className={styles.ratings}>
                  {place.reviews.map((review) => (
                    <li key={review.id} className={styles.rating}>
                      <div className={styles.rating__avatar}>
                        {review.description.slice(0, 2)}
                      </div>
                      <div className={styles.rating__content}>
                        <RatingStar mark={review.mark} />
                        <span>{review.description}</span>
                      </div>

                      {review.images.map((image) => (
                        <div className={styles.rating__photo} key={image.image}>
                          <Image
                            src={image.image}
                            fill
                            alt={image.image}
                            objectFit='cover'
                            onClick={() => setMainImg(image.image)}
                          />
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
          <section id='map'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.2309684126076!2d30.53013007694066!3d50.43679838834614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf07295b8e39%3A0x17b2112e2dc0e7a!2z0YPQuy4g0JzQtdGH0L3QuNC60L7QstCwLCAxNC8xLCDQmtC40LXQsiwgMDIwMDA!5e0!3m2!1sru!2sua!4v1718105878063!5m2!1sru!2sua'
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
