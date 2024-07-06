'use client';
import React, { useEffect, useState, Suspense } from 'react';
import styles from './places.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PlacesFilters } from '@/components/PlacesFilters';
import { getPlaces } from '@/services/getPlaces';
import { PaginationType, Place } from '@/types/types';
import { RatingStar } from '@/components/RatingStar';
import { SortBy } from '@/components/SortBy/SortBy';
import { Pagination } from '@/components/Pagination';

const Places = () => {
  const PlaceContent = () => {
    const searchParams = useSearchParams();
    const [sortVarVisible, setSortVarVisible] = useState(false);
    const [places, setPlaces] = useState<Place[] | []>([]);
    const [paginationData, setPaginationData] = useState<PaginationType>({
      previous: null,
      next: null,
      count: 0,
    });

    useEffect(() => {
      const params = new URLSearchParams();

      const metrosParam = searchParams.get('metro_ids');
      if (metrosParam) {
        params.append('metro_ids', metrosParam);
      }

      const typesParam = searchParams.get('type_ids');
      if (typesParam) {
        params.append('type_ids', typesParam);
      }

      const featuresParam = searchParams.get('feature_ids');
      if (featuresParam) {
        params.append('feature_ids', featuresParam);
      }

      const cuisinesParam = searchParams.get('cuisine_ids');
      if (cuisinesParam) {
        params.append('cuisine_ids', cuisinesParam);
      }

      const orderingParam = searchParams.get('ordering');
      if (orderingParam) {
        params.append('ordering', orderingParam);
      }

      const pageParam = searchParams.get('page');
      if (pageParam) {
        params.append('page', pageParam);
      }

      getPlaces(`?${params.toString()}`).then((data) => {
        setPlaces(data.results);
        setPaginationData({
          previous: data.previous,
          next: data.next,
          count: data.count,
        });
      });
    }, [searchParams]);

    return (
      <div className={styles.page__content}>
        <PlacesFilters />
        <div className={styles.catalog}>
          <div className={styles.catalog__top}>
            <h1 className={styles.catalog__title}>Каталог закладів Києва</h1>
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
                      unoptimized
                      src={place.main_photo}
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
                          {place.medium_check}{` `}грн
                        </b>
                      </p>
                    </div>
                    <div className={styles.catalog__item_row}>
                      <button className={styles.catalog__item_moreInfoBtn}>
                        Детальніше
                      </button>
                      <RatingStar mark={place.mark} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {paginationData.count > 2 && (
            <Pagination paginationData={paginationData} />
          )}
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
