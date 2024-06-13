import Link from 'next/link';
import React, { useState } from 'react';
import s from './SortBy.module.scss';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

type Props = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SortBy: React.FC<Props> = ({ isVisible, setIsVisible }) => {
  const pathname = usePathname();
  const [value, setValue] = useState('News');
  
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
        </div>
        <div
          className={cn(s.sortBy__options, {
            [s['sortBy__options--active']]: isVisible,
          })}
        >
          <Link href={pathname + '?ordering=' + 'name'}>A-Z</Link>
          <Link href={pathname + '?ordering=' + '-name'}>Z-A</Link>
          <Link href={pathname + '?ordering=' + 'medium_check'}>0-9</Link>
          <Link href={pathname + '?ordering=' + '-medium_check'}>9-0</Link>
          <Link href={pathname + '?ordering=' + '-data_created'}>News</Link>
        </div>
      </div>
    </div>
  );
};
