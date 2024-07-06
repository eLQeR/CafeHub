'use client';

import React, { useCallback } from 'react';
import { PaginationType } from '@/types/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import s from './Pagination.module.scss';

type Props = {
  paginationData: PaginationType;
};

export const Pagination: React.FC<Props> = ({ paginationData }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === '') {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  let prevPageIndex = '';
  console.log('=>', paginationData.previous?.includes('page='))
  if (
    paginationData.previous !== null &&
    !paginationData.previous?.includes('page=')
  ) {
    prevPageIndex = '1';
  } else if (paginationData.previous !== null) {
    prevPageIndex =
      paginationData.previous
        ?.split('page=')[1]
        .split('&')[0] || '';
  }

  let prevPageUrl = pathname + '?' + createQueryString('page', prevPageIndex);

  let nextPageUrl =
    pathname +
    '?' +
    createQueryString(
      'page',
      paginationData.next?.split('page=')[1].split('&')[0] ||
        ''
    );

  if (paginationData.previous === null) {
    prevPageUrl = '';
  }
  if (paginationData.next === null) {
    nextPageUrl = '';
  }

  // console.log('LINK1', prevPageUrl);
  console.log('LINK2', nextPageUrl);

  return (
    <div className={s.pagination}>
      <Link
        href={prevPageUrl}
        className={cn(s.pagination__link, {
          [s.disabled]: paginationData.previous === null,
        })}
      >
        Попередня сторінка
      </Link>
      <Link
        href={nextPageUrl}
        className={cn(s.pagination__link, {
          [s.disabled]: paginationData.next === null,
        })}
      >
        Наступна сторінка
      </Link>
    </div>
  );
};
