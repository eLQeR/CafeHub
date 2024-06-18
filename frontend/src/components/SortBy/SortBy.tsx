import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import s from './SortBy.module.scss';
import cn from 'classnames';

type Props = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const orderingVariants = [
  {
    title: 'name',
    value: 'A-Z',
  },
  {
    title: '-name',
    value: 'Z-A',
  },
  {
    title: 'medium_check',
    value: '0-9',
  },
  {
    title: '-medium_check',
    value: '9-0',
  },
  {
    title: '-data_created',
    value: 'News',
  },
];

export const SortBy: React.FC<Props> = ({ isVisible, setIsVisible }) => {
  const pathname = usePathname();
  const [value, setValue] = useState('News');
  const searchParams = useSearchParams();
  const ordering = searchParams.get('ordering');

  useEffect(() => {
    if (ordering) {
      orderingVariants.forEach((variant) => {
        if (variant.title === ordering) {
          setValue(variant.value);
        }
      });
    }
  }, [ordering]);

  return (
    <div className={s.sortBy}>
      <span>Sort by:</span>
      <div className={s.sortBy__place}>
        <div
          className={s.sortBy__trigger}
          onClick={() => {
            setIsVisible((prev) => !prev);
          }}
        >
          {value}
          <button
            className={cn(s['sortBy__trigger--btn'], {
              [s['sortBy__trigger--btn--active']]: isVisible,
            })}
          ></button>
        </div>
        <div
          className={cn(s.sortBy__options, {
            [s['sortBy__options--active']]: isVisible,
          })}
        >
          {orderingVariants.map((variant) => {
            return (
              <Link
                key={variant.title}
                href={pathname + '?ordering=' + `${variant.title}`}
                className={s.sortBy__item}
              >
                {variant.value}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
