import { Place } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import s from './PlaceList.module.scss';
import Image from 'next/image';
import { RatingStar } from '../RatingStar';

export const PlaceList = ({ places }: { places: Place[] }) => {
  return (
    <>
      {places.map((place) => {
        return (
          <Link
            href={`places/${place.id}`}
            className={s.catalog__item}
            key={place.id}
          >
            <div className={s.catalog__item_imageContainer}>
              <Image
                unoptimized
                src={place.main_photo}
                fill
                alt={`main image ${place.type} ${place.name}`}
              ></Image>
            </div>
            <div className={s.catalog__item_infoContainer}>
              <p className={s.catalog__item_type}>{place.type}</p>
              <p className={s.catalog__item_name}>{place.name}</p>
              <div className={s.catalog__item_row}>
                <p className={s.catalog__item_mediumCheck}>
                  Середній чек від: {` `}
                  <b className={s.catalog__item_mediumCheck_data}>
                    {place.medium_check}
                    {` `}грн
                  </b>
                </p>
              </div>
              <div className={s.catalog__item_row}>
                <button className={s.catalog__item_moreInfoBtn}>
                  Детальніше
                </button>
                <RatingStar mark={place.mark} />
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};
