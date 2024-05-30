'use client';
import { FC, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Slider.module.scss';
import cn from 'classnames';
type Place = {
  id: number;
  img: string;
  type: string;
  link: string;
  name: string;
  metro: string;
  comments: number;
};
type Props = {
  sliderTitle: string;
  places: Place[]
};

export const Slider: FC<Props> = ({ sliderTitle, places }) => {

  const [activeArrowLeft, setActiveArrowLeft] = useState(false);
  const [activeArrowRight, setActiveArrowRight] = useState(true);
  const slider = useRef<HTMLUListElement>(null);
  const cell = useRef<HTMLLIElement>(null);
  let sliderItemWidth = 0;
  const gap = places.length * 10;

  if (cell.current) {
    sliderItemWidth = cell.current.offsetWidth;
  }

  const goLeft = () => {
    if (slider.current) {
      setActiveArrowRight(true);
      const currentScroll = slider.current.scrollLeft;

      slider.current.scrollTo(currentScroll - sliderItemWidth - 10, 0);

      console.log(currentScroll, sliderItemWidth);
      if (currentScroll - sliderItemWidth <= 20) {
        setActiveArrowLeft(false);
      }
    }
  };

  const goRight = () => {
    if (slider.current && cell.current) {
      const currentScroll = slider.current.scrollLeft;
      const maxScroll =
        slider.current.scrollWidth - slider.current.offsetWidth - gap;

      sliderItemWidth = cell.current.offsetWidth;
      slider.current.scrollTo(currentScroll + sliderItemWidth + 10, 0);

      setActiveArrowLeft(true);
      if (currentScroll + sliderItemWidth >= maxScroll) {
        setActiveArrowRight(false);
      }
    }
  };

  return (
    <div className={styles.placeSlider}>
      <div className={styles.placeSlider__top}>
        <h3 className={styles.placeSlider__title}>{sliderTitle}</h3>
      </div>
      <div className={styles.placeSlider__container}>
        <button
          className={cn(styles.placeSlider__btn, styles.placeSlider__btn_left)}
          type='button'
          onClick={goLeft}
          disabled={!activeArrowLeft}
          aria-label='slider move left'
        ></button>
        <ul className={styles.placeSlider__list} ref={slider}>
          {places.map((place) => (
            <li className={styles.placeSlider__cell} key={place.id} ref={cell}>
              <div className={styles.placeSlider__logo}>
                <Link href={`places${place.link}`}>
                  <Image
                    src={place.img}
                    alt={`Slider place img ${place.id}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              </div>
              <div className={styles.placeSlider__bottom}>
                <p className={styles.placeSlider__type}>{place.type}</p>
                <h3 className={styles.placeSlider__name}>{place.name}</h3>
                <div className={styles.placeSlider__location}>
                  <div className={styles.placeSlider__metro}>
                    <Image
                      src={'/img/svg/metro.svg'}
                      width={21}
                      height={21}
                      alt='metro'
                    />
                    <span className={styles.placeSlider__metroName}>
                      {place.metro}
                    </span>
                  </div>

                  <a href='/' className={styles.placeSlider__reviews}>
                    {place.comments} отзывов
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          className={cn(styles.placeSlider__btn, styles.placeSlider__btn_right)}
          type='button'
          onClick={goRight}
          disabled={!activeArrowRight}
          aria-label='slider move right'
        ></button>
      </div>
    </div>
  );
};
