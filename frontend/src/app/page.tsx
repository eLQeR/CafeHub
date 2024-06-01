import { Slider } from '@/components/Slider';
import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const places = [
    {
      id: 0,
      img: '/data/1.jpg',
      type: 'Ресторан',
      link: '/restoran-mamay',
      name: 'Mamay',
      metro: 'Героев Днепра',
      comments: 16,
    },
    {
      id: 1,
      img: '/data/2.jpg',
      type: 'Ресторан',
      link: '/restoran-la-maison',
      name: 'Ресторан «La Maison»',
      metro: 'Лукьяновская',
      comments: 20,
    },
    {
      id: 2,
      img: '/data/3.jpg',
      type: 'Ресторан',
      link: '/restoran-gogi-dnprovska-nab',
      name: 'Ресторан «Gogi Днепровская наб.»',
      metro: 'Осокорки',
      comments: 16,
    },
    {
      id: 3,
      img: '/data/4.jpg',
      type: 'Ресторан',
      link: '',
      name: 'Ресторан «Porto Maltese (Порто Мальтезе)»',
      metro: 'Арсенальная',
      comments: 52,
    },
    {
      id: 4,
      img: '/data/5.jpg',
      type: 'Ресторан',
      link: '/restoran-porto-maltese',
      name: 'Бистро Пекаря на Тарасовской',
      metro: 'Олимпийская',
      comments: 31,
    },
    {
      id: 5,
      img: '/data/5.jpg',
      type: 'Ресторан',
      link: '/restoran-bistro-pekarya-na-tarasovskoy',
      name: 'Бистро Пекаря на Тарасовской',
      metro: 'Олимпийская',
      comments: 31,
    },
  ];
  const places2 = [...places];

  const filtersData = [
    {
      url: '/type:cafe;osobennost:detskaya-komnata,detskie-master-klassy,detskiy-stulchik,detskoe-menyu/',
      imgUrl: '/img/kids-cafes2.jpg',
      name: 'kids café',
    },
    {
      url: '/type:bar;osobennost:zhivaya-muzyka/',
      imgUrl: '/img/live-music-bars3.jpg',
      name: 'live music bars',
    },
    {
      url: '/kuhnja:burgeri,vegeterianskaja/',
      imgUrl: '/img/vegan-burger.jpg',
      name: 'Vegan burgers',
    },
  ];
  return (
    <>
      <div className={styles.hero}>
        <Image src='/hero.png' fill alt='logo' style={{ objectFit: 'cover' }} />
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Find the best restaurants, cafes and bars in Kyiv city
          </h1>
          <div className={styles.hero__row}>
            <input
              type='text'
              placeholder='Place name ...'
              className={styles.hero__search}
            />
            <button className={styles.hero__btn}>Search</button>
          </div>
        </div>
      </div>
      <main className={styles.page__container}>
        <div className={styles.filters__top}>
          <h3 className={styles.filters__title}>Collections for you</h3>
        </div>

        <div className={styles.filters}>
          {filtersData.map((filterItem) => (
            <Link
              href={filterItem.url}
              className={styles.filters__item}
              key={filterItem.name}
            >
              <Image
                src={filterItem.imgUrl}
                fill
                alt={filterItem.name}
                style={{ objectFit: 'cover' }}
              />

              <p className={styles.filters__item_title}>{filterItem.name}</p>
            </Link>
          ))}
        </div>

        <Slider sliderTitle={'New places'} places={places} />
        <Slider
          sliderTitle={'Popular places'}
          places={places2.sort((a, b) => b.comments - a.comments)}
        />
      </main>
    </>
  );
}
