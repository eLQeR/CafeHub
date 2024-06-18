'use client';
import React, { useEffect, useState, Suspense } from 'react';
import styles from './places.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PlacesFilters } from '@/components/PlacesFilters';
import { getPlaces } from '@/services/getPlaces';
import { Place } from '@/types/types';
import { RatingStar } from '@/components/RatingStar';
import { SortBy } from '@/components/SortBy/SortBy';

const Places = () => {
  const PlaceContent = () => {
    const [sortVarVisible, setSortVarVisible] = useState(false);
    const searchParams = useSearchParams();

    const [places, setPlaces] = useState<Place[] | []>([]);

    useEffect(() => {
      const params = new URLSearchParams();

      const metrosParam = searchParams.get('metroes');
      if (metrosParam) {
        params.append('metroes', metrosParam);
      }

      const typesParam = searchParams.get('types');
      if (typesParam) {
        params.append('types', typesParam);
      }

      const featuresParam = searchParams.get('features');
      if (featuresParam) {
        params.append('features', featuresParam);
      }

      const cuisinesParam = searchParams.get('cuisine');
      if (cuisinesParam) {
        params.append('cuisines', cuisinesParam);
      }

      const orderingParam = searchParams.get('ordering');
      if (orderingParam) {
        params.append('ordering', orderingParam);
      }

      // console.log('PARAMS:', params.toString(), params.get('ordering'));

      getPlaces(`?${params.toString()}`).then((data) => {
        setPlaces(data);
      });
    }, [searchParams]);
    return (
      <div className={styles.page__content}>
        <PlacesFilters />
        <div className={styles.catalog}>
          <div className={styles.catalog__top}>
            <h2 className={styles.catalog__title}>
              Catalog of restaurants and cafes
            </h2>
            <SortBy
              isVisible={sortVarVisible}
              setIsVisible={setSortVarVisible}
            />
          </div>
          <div className={styles.catalog__list}>
            {places.map((place) => {
              return (
                <Link
                  href={`places/${place.id}`}
                  className={styles.catalog__item}
                  key={place.id}
                >
                  <div className={styles.catalog__item_imageContainer}>
                    <Image
                      src={`/data/1.jpg`}
                      fill
                      alt={`main image ${place.type} ${place.name}`}
                    ></Image>
                  </div>
                  <div className={styles.catalog__item_infoContainer}>
                    <p className={styles.catalog__item_type}>{place.type}</p>
                    <p className={styles.catalog__item_name}>{place.name}</p>
                    <div className={styles.catalog__item_row}>
                      <p className={styles.catalog__item_mediumCheck}>
                        Середній чек від: {` `}
                        <b className={styles.catalog__item_mediumCheck_data}>
                          {place.medium_check}грн
                        </b>
                      </p>
                    </div>
                    <div className={styles.catalog__item_row}>
                      <button className={styles.catalog__item_moreInfoBtn}>
                        More info
                      </button>
                      <RatingStar mark={place.mark} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  return (
    <main className={styles.page__container}>
      <Suspense fallback={<div>Loading...</div>}>
        <PlaceContent />
      </Suspense>
    </main>
  );
};

export default Places;
