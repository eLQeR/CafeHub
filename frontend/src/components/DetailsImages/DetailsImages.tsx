'use client';
import Image from 'next/image';
import s from './DetailsImages.module.scss';
import { useRef, useState } from 'react';

type Props = {
  name: string;
  images: string[];
};

export const DetailsImages: React.FC<Props> = ({ name, images }) => {
  const [mainImg, setMainImg] = useState(images[0]);

  const slider = useRef<HTMLDivElement>(null);
  const cell = useRef<HTMLDivElement>(null);
  const [activeArrowLeft, setActiveArrowLeft] = useState(false);
  const [activeArrowRight, setActiveArrowRight] = useState(true);
  let sliderItemWidth = 0;

  if (cell.current) {
    sliderItemWidth = cell.current.offsetWidth;
  }

  const goLeft = () => {
    console.log('L', slider.current);
    if (slider.current) {
      setActiveArrowRight(true);
      const currentScroll = slider.current.scrollLeft;

      slider.current.scrollTo(currentScroll - sliderItemWidth , 0);
      if (currentScroll - sliderItemWidth <= 0) {
        setActiveArrowLeft(false);
      }
    }
  };

  const goRight = () => {
    console.log(slider.current);
    if (slider.current) {
      const currentScroll = slider.current.scrollLeft;
      const maxScroll = slider.current.scrollWidth - slider.current.offsetWidth;
      const itemWidth = slider.current.scrollWidth / images.length;

      slider.current.scrollTo(currentScroll + itemWidth, 0);
      setActiveArrowLeft(true);
      if (currentScroll + sliderItemWidth >= maxScroll) {
        setActiveArrowRight(false);
      }
    }
  };
  return (
    <div className={s.gallery}>
      <div className={s.gallery__top}>
        <Image
          src={mainImg}
          fill
          alt={`place ${name} main photo`}
          objectFit='cover'
        ></Image>
      </div>
      <div className={s.gallery__bot}>
        <button
          className={`${s.gallery__btn} ${s.gallery__btn_prev}`}
          onClick={goLeft}
          disabled={!activeArrowLeft}
        ></button>
        <div className={s.gallery__items} ref={slider}>
          {images.map((img) => (
            <div key={img} className={s.gallery__item} ref={cell}>
              <Image
                src={img}
                fill
                alt={`place ${name} main photo`}
                objectFit='cover'
                onClick={() => {
                  setMainImg(img);
                }}
              ></Image>
            </div>
          ))}
        </div>
        <button
          className={`${s.gallery__btn} ${s.gallery__btn_next}`}
          onClick={goRight}
          disabled={!activeArrowRight}
        ></button>
      </div>
    </div>
  );
};
