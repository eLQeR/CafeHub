import React from 'react';
import s from './about.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Про проєкт | CafeHub',
  description: 'Більше інформації про проєкт CafeHub та його команду',
};

const page = () => {
  return (
    <main>
      <Image
        className={s['hero-img']}
        src={'/hero-about.webp'}
        width={980}
        height={490}
        alt='about hero image'
      ></Image>
      <div className={s.container}>
        <h1>Про нас</h1>
        <div className={s.content}>
          <div className={s.row}>
            <Image
              src={'/img/logo.png'}
              width={220}
              height={120}
              alt='our history'
              className={s.row__img}
            ></Image>
            <div className={s.text}>
              <h3>Наша Історія </h3> Ми — команда справжніх гурманів, які
              об’єдналися, щоб подарувати вам незабутні смакові враження. Наша
              історія почалася з маленького кафе на вулиці Київської старовинної
              частини міста. Ми відкрили його з однією метою: дарувати гостям
              смачні страви, які зігрівають душу та розкривають справжні смаки.
            </div>
          </div>
          <div className={s.row}>
            <div className={s.text}>
              <h3>Наша Філософія </h3> Ми віримо, що їжа — це не просто
              споживання, а справжнє мистецтво. Наші шеф-кухарі вкладають у
              кожну страву своє серце та досвід. Ми віддаємо перевагу
              натуральним інгредієнтам, вирощеним з любов’ю та повагою до
              природи.
            </div>
            <Image
              src={'/about-philosophy.webp'}
              width={853}
              height={577}
              alt='our philosophy'
              className={s.row__img}
            ></Image>
          </div>
          <div className={s.row}>
            <Image
              src={'/team.webp'}
              width={220}
              height={120}
              alt='our history'
              className={s.row__img}
            ></Image>
            <div className={s.text}>
              <h3> Наша Команда</h3>
              <a
                className={s.text__link}
                href='https://github.com/eLQeR'
                target='_blank'
              >
                Бізюк Ярослав
              </a>{' '}
              — Python Backend Developer Ярослав — справжній магістр коду. Він
              відповідає за розробку нашого веб-сайту та забезпечує його
              безперебійну роботу. Його вміння вирішувати складні завдання та
              відмінне розуміння Django допомагають нам підтримувати високий
              рівень функціональності.
              <br />
              <br />
              <a
                className={s.text__link}
                href='https://github.com/ptbit'
                target='_blank'
              >
                Євгеній Вахоцький
              </a>{' '}
              — Next.js Developer Євгеній — творчий геній, який відповідає за
              дизайн та користувацький досвід нашого сайту. Його вміння
              працювати зі стеком технологій, таких як React та Next.js,
              допомагають нам створювати красивий та зручний інтерфейс для наших
              клієнтів.
            </div>
          </div>
          <div className={s.row}>
            Запрошуємо до нашого світу смаків! Нехай ця сторінка розкриє перед
            відвідувачами всю нашу пристрасть до кулінарії та гостинності. Якщо
            ви маєте ще якісь ідеї або побажання, не соромтеся поділитися ними з
            нами! 🍽
          </div>
          <div className={s.links}>
            <Link className={s.link} href={'/places'}>
              Вибір закладу
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
