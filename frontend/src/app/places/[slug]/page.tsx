'use client';
import Image from 'next/image';
import styles from './place.module.scss';
import { DetailsImages } from '@/components/DetailsImages';
import { getPlace } from '@/services/getPlaces';
import { useEffect, useState } from 'react';
import { DetailsPlace } from '@/types/types';

export default function Page({ params }: { params: { slug: string } }) {
  console.log('details for Place:', params.slug);

  const [place, setPlace] = useState<undefined | DetailsPlace>(undefined);

  useEffect(() => {
    getPlace(params.slug).then((data) => {
      setPlace(data);
    });
  }, []);

  // const images = [
  //   '/mockData/1.jpg',
  //   '/mockData/2.jpg',
  //   '/mockData/3.jpg',
  //   '/mockData/4.jpg',
  //   '/mockData/5.jpg',
  //   '/mockData/6.jpg',
  //   '/mockData/7.jpg',
  //   '/mockData/8.jpg',
  //   '/mockData/9.jpg',
  //   '/mockData/10.jpg',
  //   '/mockData/11.jpg',
  //   '/mockData/12.jpg',
  //   '/mockData/13.jpg',
  // ];
  return (
    <>
      {place ? (
        <main className={styles.page__container}>
          <h1 className={styles.page__title}>{place.name}</h1>
          <DetailsImages name={params.slug} images={place.images} />
        </main>
      ) : (
        <h1> Loading...</h1>
      )}
    </>
  );
}
