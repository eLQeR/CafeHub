'use client';
import React, { useState } from 'react';
import styles from './places.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import { PLACELIST, FILTERS } from '../../lib/constants';
import { getPlaces } from '@/lib/getPlaces';

const Places = () => {
  const [openGroupId, setOpenGroupId] = useState<null | string>(null);

  const searchParams = useSearchParams();
  const selectedMetro = searchParams.get('metro')?.split(',') || [];

  const handleToggle = (groupId: string) => {
    setOpenGroupId((prevGroupId) => (prevGroupId === groupId ? null : groupId));
  };
  // const arr = getPlaces();
  // console.log('ARR:', arr);

  return (
    <div className={styles.page__container}>
      <div className={styles.page__content}>
        <aside className={styles.filters}>
          <p className={styles.filters__title}>filters</p>
          {FILTERS.lines.map((line) => (
            <div key={line.ID} className={styles.filters__block}>
              <div
                className={styles.filters__block_title}
                onClick={() => {
                  handleToggle(line.ID);
                }}
              >
                <span>{line.NAME}</span>{' '}
                <button
                  className={classNames(styles.filters__block_btn, {
                    [styles.filters__block_btn_active]: openGroupId === line.ID,
                  })}
                ></button>
              </div>
              <ul
                className={classNames(styles.filters__subBlock, {
                  [styles.filters__subBlock_active]: openGroupId === line.ID,
                })}
              >
                {line.SUBWAYS.map((sub) => {
                  let metroParams = [...(selectedMetro || [])];
                  if (metroParams.includes(sub.SLUG)) {
                    metroParams = metroParams.filter(
                      (station) => station !== sub.SLUG
                    );
                  } else {
                    metroParams.push(sub.SLUG);
                  }
                  let linkUrl = `?metro=${metroParams}`;
                  if (linkUrl === '?metro=') {
                    linkUrl = '/places';
                  }
                  return (
                    <Link
                      key={sub.ID}
                      href={linkUrl}
                      className={styles.filters__link}
                    >
                      <li className={styles.filters__link_item}>
                        <input
                          value={sub.ID}
                          id={`subway_${sub.ID}`}
                          type='checkbox'
                          data-title={sub.NAME}
                          checked={selectedMetro?.includes(sub.SLUG)}
                          onChange={() => {}}
                          className={styles.filters__link_check}
                        ></input>
                        <label
                          htmlFor={`subway_${sub.ID}`}
                          className={styles.filters__link_text}
                        >
                          {sub.NAME}
                        </label>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>
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
            {PLACELIST.map((place) => {
              return (
                <Link
                  href={place.link}
                  className={styles.catalog__item}
                  key={place.id}
                >
                  <div className={styles.catalog__item_imageContainer}>
                    <Image
                      src={place.img}
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
                            style={{ width: `${place.rating * 20}%` }}
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
    </div>
  );
};

export default Places;
