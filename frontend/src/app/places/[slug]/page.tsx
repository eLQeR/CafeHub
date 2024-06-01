import Image from 'next/image';
import styles from './place.module.scss';
import { DetailsImages } from '@/components/DetailsImages';

export default function Page({ params }: { params: { slug: string } }) {
  console.log('details for Place:', params.slug);
  const images = [
    '/mockData/1.jpg',
    '/mockData/2.jpg',
    '/mockData/3.jpg',
    '/mockData/4.jpg',
    '/mockData/5.jpg',
    '/mockData/6.jpg',
    '/mockData/7.jpg',
    '/mockData/8.jpg',
    '/mockData/9.jpg',
    '/mockData/10.jpg',
    '/mockData/11.jpg',
    '/mockData/12.jpg',
    '/mockData/13.jpg',
  ];
  return (
    <main className={styles.page__container}>
      <h1 className={styles.page__title}>Ресторан Черноморка</h1>
      <DetailsImages name={params.slug} images={images} />
      {/* <iframe
        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5083.230300722874!2d30.5970149!3d50.4296416!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c57d6ef0f4bf%3A0xe1cf2dfd1013e0d0!2z0KLQtdCw0YLRgCAi0JHQtdGA0LXQs9C40L3RjyI!5e0!3m2!1sru!2sua!4v1716556825380!5m2!1sru!2sua'
        width='600'
        height='450'
        // style='border:0;'
        // allowfullscreen=''
        loading='lazy'
        // referrerpolicy='no-referrer-when-downgrade'
      ></iframe> */}
    </main>
  );
}
