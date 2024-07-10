'use client';
import React, { useEffect, useState, Suspense } from 'react';
import styles from './places.module.scss';
import { useSearchParams } from 'next/navigation';
import { PlacesFilters } from '@/components/PlacesFilters';
import { PaginationType, Place } from '@/types/types';
import { SortBy } from '@/components/SortBy/SortBy';
import { Pagination } from '@/components/Pagination';
import { PlaceList } from '@/components/PlaceList';
import { PAGINATION_ITEM_LIMIT } from '@/services/constants';
import { Loader } from '@/components/Loader';
import { API } from '@/services/apiRequests';

const Places = () => {
  const PlaceContent = () => {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [sortVarVisible, setSortVarVisible] = useState(false);
    const [places, setPlaces] = useState<Place[] | []>([]);
    const [paginationData, setPaginationData] = useState<PaginationType>({
      previous: null,
      next: null,
      count: 0,
    });

    useEffect(() => {
      setIsLoading(true);
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

      API.getPlaces(`?${params.toString()}`)
        .then((data) => {
          setPlaces(data.results);
          setPaginationData({
            previous: data.previous,
            next: data.next,
            count: data.count,
          });
        })
        .finally(() => setIsLoading(false));
    }, [searchParams]);

    return (
      <div className={styles.page__content}>
        <PlacesFilters />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.catalog}>
            {places.length === 0 ? (
              <h2>За вибраними фільтрами жодного закладу не знайдено</h2>
            ) : (
              <>
                <div className={styles.catalog__top}>
                  <h1 className={styles.catalog__title}>
                    Каталог закладів Києва. Закладів: {paginationData.count}
                  </h1>
                  <SortBy
                    isVisible={sortVarVisible}
                    setIsVisible={setSortVarVisible}
                  />
                </div>
                <div className={styles.catalog__list}>
                  <PlaceList places={places} />
                </div>
                {paginationData.count > PAGINATION_ITEM_LIMIT && (
                  <Pagination paginationData={paginationData} />
                )}
              </>
            )}
          </div>
        )}
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
