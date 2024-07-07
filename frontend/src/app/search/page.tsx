'use client';
import { PlaceList } from '@/components/PlaceList';
import { API } from '@/services/apiRequests';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './searchPage.module.scss';
import { PaginationType, Place } from '@/types/types';
import { Pagination } from '@/components/Pagination';
import { PAGINATION_ITEM_LIMIT } from '@/services/constants';

const page = () => {
  const searchParams = useSearchParams();
  const searchRequest = searchParams.get('name');
  const pageRequest = searchParams.get('page');
  const [places, setPlaces] = useState<Place[] | []>([]);
  const [paginationData, setPaginationData] = useState<PaginationType>({
    previous: null,
    next: null,
    count: 0,
  });

  useEffect(() => {
    if (searchRequest !== null) {
      API.getSearchData(searchRequest, pageRequest).then((data) => {
        setPlaces(data.results);
        setPaginationData({
          previous: data.previous,
          next: data.next,
          count: data.count,
        });
      });
    }
  }, [searchParams]);

  return (
    <main>
      <div className={styles.page__container}>
        <h1>Результати пошуку</h1>
        <p>Запит: {searchRequest}</p>
        <p>Закладів: {paginationData.count}</p>
        <div className={styles.catalog__list}>
          <PlaceList places={places} />
        </div>
        {paginationData.count > PAGINATION_ITEM_LIMIT && (
          <Pagination paginationData={paginationData} />
        )}
      </div>
    </main>
  );
};

export default page;
