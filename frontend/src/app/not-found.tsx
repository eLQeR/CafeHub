import Link from 'next/link';
import s from './page.module.scss';

export default function NotFound() {
  return (
    <main>
      <div className={s.page__container}>
        <h2 className={s.error__title}>Помилка 404</h2>
        <div className={s.content}>
          <p className={s.error__heading}>Сторінку не знайдено</p>
          <p className={s.error__message}>
            Неправильно набрано адресу або такої сторінки на сайті більше не
            існує.
          </p>
        </div>

        <Link href='/' className={s.link}>
          На головну
        </Link>
      </div>
    </main>
  );
}
