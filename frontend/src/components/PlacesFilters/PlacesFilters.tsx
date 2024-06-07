import classNames from 'classnames';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Filter } from '@/types/types';
import { getFilters } from '@/services/getPlaces';
import { MetroLines } from '@/services/constants';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './PlacesFilters.module.scss';

export const PlacesFilters = () => {
  const [openGroupId, setOpenGroupId] = useState<null | number>(null);
  const [filters, setFilters] = useState<undefined | Filter>(undefined);

  const searchParams = useSearchParams();
  const selectedMetro = searchParams.get('metroes')?.split(',') || [];
  const selectedFeatures = searchParams.get('features')?.split(',') || [];
  const selectedTypes = searchParams.get('types')?.split(',') || [];
  const selectedCuisines = searchParams.get('cuisine')?.split(',') || [];
  const handleToggle = (groupId: number) => {
    setOpenGroupId((prevGroupId) => (prevGroupId === groupId ? null : groupId));
  };

  useEffect(() => {
    getFilters().then((filtersArr) => {
      setFilters(filtersArr);
    });
  }, []);

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

  // console.log('Filters', filters);

  return (
    <aside className={styles.filters}>
      <p className={styles.filters__title}>filters</p>

      {/* METROS */}
      <div className={styles.filters__section}>
        {filters?.metro &&
          MetroLines.map((line) => {
            return (
              <div key={line.id} className={styles.filters__block}>
                <div
                  className={styles.filters__block_title}
                  onClick={() => {
                    handleToggle(line.id);
                  }}
                >
                  <span>{line.name}</span>{' '}
                  <button
                    className={classNames(styles.filters__block_btn, {
                      [styles.filters__block_btn_active]:
                        openGroupId === line.id,
                    })}
                  ></button>
                </div>
                <ul
                  className={classNames(styles.filters__subBlock, {
                    [styles.filters__subBlock_active]: openGroupId === line.id,
                  })}
                >
                  {line.slug === 'red' && (
                    <>
                      {filters.metro['red'].map((sub) => {
                        let metroParams = [...(selectedMetro || [])];

                        if (metroParams.includes(sub.id.toString())) {
                          metroParams = metroParams.filter(
                            (station) => station !== sub.id.toString()
                          );
                        } else {
                          metroParams.push(sub.id.toString());
                        }

                        let linkUrl =
                          pathname +
                          '?' +
                          createQueryString('metroes', metroParams.join(','));

                        return (
                          <Link
                            key={sub.id}
                            href={linkUrl}
                            className={styles.filters__link}
                          >
                            <li className={styles.filters__link_item}>
                              <input
                                value={sub.id}
                                id={`subway_${sub.id}`}
                                type='checkbox'
                                data-title={sub.name}
                                onChange={() => {}}
                                checked={selectedMetro?.includes(
                                  sub.id.toString()
                                )}
                                className={styles.filters__link_check}
                              ></input>
                              <label
                                htmlFor={`subway_${sub.id}`}
                                className={styles.filters__link_text}
                              >
                                {sub.name}
                              </label>
                            </li>
                          </Link>
                        );
                      })}
                    </>
                  )}
                  {line.slug === 'blue' && (
                    <>
                      {filters.metro['blue'].map((sub) => {
                        let metroParams = [...(selectedMetro || [])];

                        if (metroParams.includes(sub.id.toString())) {
                          metroParams = metroParams.filter(
                            (station) => station !== sub.id.toString()
                          );
                        } else {
                          metroParams.push(sub.id.toString());
                        }

                        let linkUrl =
                          pathname +
                          '?' +
                          createQueryString('metroes', metroParams.join(','));

                        return (
                          <Link
                            key={sub.id}
                            href={linkUrl}
                            className={styles.filters__link}
                          >
                            <li className={styles.filters__link_item}>
                              <input
                                value={sub.id}
                                id={`subway_${sub.id}`}
                                type='checkbox'
                                data-title={sub.name}
                                checked={selectedMetro?.includes(
                                  sub.id.toString()
                                )}
                                onChange={() => {}}
                                className={styles.filters__link_check}
                              ></input>
                              <label
                                htmlFor={`subway_${sub.id}`}
                                className={styles.filters__link_text}
                              >
                                {sub.name}
                              </label>
                            </li>
                          </Link>
                        );
                      })}
                    </>
                  )}
                  {line.slug === 'green' && (
                    <>
                      {filters.metro['green'].map((sub) => {
                        let metroParams = [...(selectedMetro || [])];

                        if (metroParams.includes(sub.id.toString())) {
                          metroParams = metroParams.filter(
                            (station) => station !== sub.id.toString()
                          );
                        } else {
                          metroParams.push(sub.id.toString());
                        }

                        let linkUrl =
                          pathname +
                          '?' +
                          createQueryString('metroes', metroParams.join(','));

                        return (
                          <Link
                            key={sub.id}
                            href={linkUrl}
                            className={styles.filters__link}
                          >
                            <li className={styles.filters__link_item}>
                              <input
                                value={sub.id}
                                id={`subway_${sub.id}`}
                                type='checkbox'
                                data-title={sub.name}
                                checked={selectedMetro?.includes(
                                  sub.id.toString()
                                )}
                                onChange={() => {}}
                                className={styles.filters__link_check}
                              ></input>
                              <label
                                htmlFor={`subway_${sub.id}`}
                                className={styles.filters__link_text}
                              >
                                {sub.name}
                              </label>
                            </li>
                          </Link>
                        );
                      })}
                    </>
                  )}
                </ul>
              </div>
            );
          })}
      </div>

      {/* TYPES */}
      <div className={styles.filters__section}>
        <p className={styles.filters__section_title}>Places types:</p>
        <ul className={styles.filters__section_list}>
          {filters?.cafe_types.map((type) => {
            let typesParams = [...(selectedTypes || [])];

            if (typesParams.includes(type.id.toString())) {
              typesParams = typesParams.filter(
                (station) => station !== type.id.toString()
              );
            } else {
              typesParams.push(type.id.toString());
            }
            let linkUrl =
              pathname +
              '?' +
              createQueryString('types', typesParams.join(','));

            return (
              <Link
                key={type.id}
                href={linkUrl}
                className={styles.filters__link}
                scroll={false}
              >
                <li className={styles.filters__link_item}>
                  <input
                    value={type.slug}
                    id={`subway_${type.slug}`}
                    type='checkbox'
                    data-title={type.slug}
                    checked={selectedTypes?.includes(type.id.toString())}
                    onChange={() => {}}
                    className={styles.filters__link_check}
                  ></input>
                  <label
                    htmlFor={`subway_${type.slug}`}
                    className={styles.filters__link_text}
                  >
                    {type.slug}
                  </label>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      {/* FEATURES */}
      <div className={styles.filters__section}>
        <p className={styles.filters__section_title}>Places features:</p>
        <ul className={styles.filters__section_list}>
          {filters?.features.map((feature) => {
            let featuresParams = [...(selectedFeatures || [])];

            if (featuresParams.includes(feature.id.toString())) {
              featuresParams = featuresParams.filter(
                (station) => station !== feature.id.toString()
              );
            } else {
              featuresParams.push(feature.id.toString());
            }

            let linkUrl =
              pathname +
              '?' +
              createQueryString('features', featuresParams.join(','));

            return (
              <Link
                key={feature.id}
                href={linkUrl}
                className={styles.filters__link}
                scroll={false}
              >
                <li className={styles.filters__link_item}>
                  <input
                    value={feature.id}
                    id={`subway_${feature.id}`}
                    type='checkbox'
                    data-title={feature.name}
                    checked={selectedFeatures?.includes(feature.id.toString())}
                    onChange={() => {}}
                    className={styles.filters__link_check}
                  ></input>
                  <label
                    htmlFor={`subway_${feature.id}`}
                    className={styles.filters__link_text}
                  >
                    {feature.name}
                  </label>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      {/*Cuisines */}
      <div className={styles.filters__section}>
        <p className={styles.filters__section_title}>Places cuisines:</p>
        <ul className={styles.filters__section_list}>
          {filters?.cuisine.map((type) => {
            let cuisinesParams = [...(selectedCuisines || [])];
            if (cuisinesParams.includes(type.id.toString())) {
              cuisinesParams = cuisinesParams.filter(
                (station) => station !== type.id.toString()
              );
            } else {
              cuisinesParams.push(type.id.toString());
            }

            let linkUrl =
              pathname +
              '?' +
              createQueryString('cuisine', cuisinesParams.join(','));

            return (
              <Link
                key={type.id}
                href={linkUrl}
                className={styles.filters__link}
                scroll={false}
              >
                <li className={styles.filters__link_item}>
                  <input
                    value={type.slug}
                    id={type.slug}
                    type='checkbox'
                    data-title={type.slug}
                    checked={selectedCuisines?.includes(type.id.toString())}
                    onChange={() => {}}
                    className={styles.filters__link_check}
                  ></input>
                  <label
                    htmlFor={`subway_${type.slug}`}
                    className={styles.filters__link_text}
                  >
                    {type.slug}
                  </label>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
