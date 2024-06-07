'use client';
import React, { useEffect, useState } from 'react';
import styles from './places.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PlacesFilters } from '@/components/PlacesFilters';
import { getPlaces } from '@/services/getPlaces';
import { Place } from '@/types/types';

const Places = () => {
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

    console.log('PARAMS:', params.toString());

    getPlaces(`?${params.toString()}`).then((data) => {
      setPlaces(data);
    });
  }, [searchParams]);

  return (
    <main className={styles.page__container}>
      <div className={styles.page__content}>
        <PlacesFilters />
        <div className={styles.catalog}>
          <div className={styles.catalog__top}>
            <h2 className={styles.catalog__title}>
              Catalog of restaurants and cafes
            </h2>
            <div className={styles.catalog__sortBy}>
              <span>Sort by:</span>
              <select name='' id=''>
                <option value=''>Popularity</option>
                <option value=''>Name</option>
                <option value=''>Price 0 - 9</option>
                <option value=''>Price 9 - 0</option>
                <option value=''>Date</option>
              </select>
            </div>
          </div>
          <div className={styles.catalog__list}>
            {places.map((place) => {
              return (
                <Link
                  href={`places/${place.id}`} //--------------
                  className={styles.catalog__item}
                  key={place.id}
                >
                  <div className={styles.catalog__item_imageContainer}>
                    <Image
                      // src={place.main_photo}
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
                      <div className={styles.catalog__item_metroInfo}>
                        <Image
                          src={'/img/svg/metro.svg'}
                          width={21}
                          height={21}
                          alt='metro'
                        />
                        <p className={styles.catalog__item_metroName}>
                          {place.metro}
                        </p>
                      </div>
                    </div>
                    <div className={styles.catalog__item_row}>
                      <button className={styles.catalog__item_moreInfoBtn}>
                        More info
                      </button>

                      <div className={styles.catalog__item_reviewInfo}>
                        <div className={styles.stars}>
                          <div
                            className={styles.stars__bg}
                            style={{ width: `${place.mark * 20}%` }}
                          ></div>
                          <Image
                            src={'/img/star.png'}
                            className={styles.star}
                            width={25}
                            height={25}
                            alt='star'
                          />
                          <Image
                            src={'/img/star.png'}
                            className={styles.star}
                            width={25}
                            height={25}
                            alt='star'
                          />
                          <Image
                            src={'/img/star.png'}
                            className={styles.star}
                            width={25}
                            height={25}
                            alt='star'
                          />
                          <Image
                            src={'/img/star.png'}
                            className={styles.star}
                            width={25}
                            height={25}
                            alt='star'
                          />
                          <Image
                            src={'/img/star.png'}
                            className={styles.star}
                            width={25}
                            height={25}
                            alt='star'
                          />
                        </div>
                        {/* <div>
                          <strong>{place.comments}</strong> відгуків
                        </div> */}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Places;
