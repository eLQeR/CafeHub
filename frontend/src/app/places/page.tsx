'use client';
import React, { useEffect, useState } from 'react';
import styles from './places.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PlacesFilters } from '@/components/PlacesFilters';
import { Place, getPlaces } from '@/services/getPlaces';

const Places = () => {
  const searchParams = useSearchParams();

  // console.log('SP:', searchParams);

  // const selectedMetro = searchParams.get('metro')?.split(',') || [];
  // const selectedFeatures = searchParams.get('features')?.split(',') || [];
  // const selectedCuisines = searchParams.get('cuisine')?.split(',') || [];
  // console.log('1', selectedTypes);

  // if (selectedTypes.length > 0) {
  //   let params = '?types=' + selectedTypes.join(',');
  //   console.log('PARAMS:', params);
  // }

  // const selectedTypes = searchParams.get('types')?.split(',') || [];
  const [places, setPlaces] = useState<Place[] | []>([]);

  useEffect(() => {
    const typesParam = searchParams.get('types');
    const selectedTypes = typesParam ? typesParam.split(',') : [];

    // console.log('LE', selectedTypes.length);
    if (selectedTypes.length > 0) {
      let params = '?types=' + selectedTypes.join(',');
      // console.log('PARAMS:', params);
      getPlaces(params).then((data) => {
        setPlaces(data);
      });
    } else {
      getPlaces().then((data) => {
        setPlaces(data);
      });
    }
  }, [searchParams]);

  // useEffect(() => {
  //   getPlaces().then((data) => {
  //     setPlaces(data);
  //   });
  // }, []);

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
                  href={`places${place.id}`} //--------------
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
