'use client';

import { Slider } from '@/components/Slider';
import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { SearchField } from '@/components/SearchField';
import { useEffect, useState } from 'react';
import { API } from '@/services/apiRequests';
import { HomePagePlaceType } from '@/types/types';
import { COLLECTIONS } from '@/services/constants';

export default function Home() {
  const [newPlaces, setNewPlaces] = useState<HomePagePlaceType[]>([]);
  const [popularPlaces, setPopularPlaces] = useState<HomePagePlaceType[]>([]);


  useEffect(() => {
    API.getHomePageData().then((data) => {
      setNewPlaces(data.new);
      setPopularPlaces(data.popular);
    });
  }, []);

  return (
    <>
      <div className={styles.hero}>
        <Image src='/hero.png' fill alt='logo' style={{ objectFit: 'cover' }} />
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Знайдіть найкращі ресторани, кафе та бари Київа
          </h1>
          <div className={styles.hero__row}>
            <SearchField style='hero' />
          </div>
        </div>
      </div>
      <main className={styles.page__container}>
        <div className={styles.filters__top}>
          <h3 className={styles.filters__title}>Колекції для вас</h3>
        </div>

        <div className={styles.filters}>
          {COLLECTIONS.map((item) => (
            <Link
              href={item.url}
              className={styles.filters__item}
              key={item.name}
            >
              <Image
                src={item.imgUrl}
                fill
                alt={item.name}
                style={{ objectFit: 'cover' }}
              />

              <p className={styles.filters__item_title}>{item.name}</p>
            </Link>
          ))}
        </div>

        {newPlaces.length > 0 && (
          <Slider sliderTitle={'Нові заклади'} places={newPlaces} />
        )}
        {popularPlaces.length > 0 && (
          <Slider sliderTitle={'Популярні заклади'} places={popularPlaces} />
        )}
      </main>
    </>
  );
}
