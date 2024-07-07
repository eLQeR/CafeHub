'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import cn from 'classnames';
import { Login } from '../Login';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const [isBurgerVisible, setIsBurgerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const linkList = [
    {
      id: 0,
      link: '/',
      label: 'Головна',
    },
    {
      id: 1,
      link: '/places',
      label: 'Заклади',
    },
    {
      id: 2,
      link: '/about',
      label: 'Про проєкт',
    },
  ];

  const burgerHandler = () => {
    setIsBurgerVisible(!isBurgerVisible);
    if (isBurgerVisible) {
      document.body.classList.remove('menu-show');
    } else {
      document.body.classList.add('menu-show');
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue !== '') {
      router.push(`/search?name=${searchValue}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <nav className={styles.nav}>
          <Link
            href='/'
            className={styles.nav__logo}
            onClick={() => setIsBurgerVisible(false)}
          >
            <Image src='/img/logo.png' width={94} height={24} alt='logo' />
          </Link>

          <ul
            className={cn(styles.nav__list, {
              [styles.nav__list_active]: isBurgerVisible,
            })}
          >
            {linkList.map((link) => (
              <li className={styles.nav__item} key={link.id}>
                <Link
                  href={link.link}
                  className={cn(styles.nav__link, {
                    [styles.nav__link__active]: pathname === link.link,
                  })}
                  onClick={() => setIsBurgerVisible(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.header__right}>
          <div className={styles.header__searchContainer}>
            <input
              type='text'
              placeholder='Search...'
              className={styles.header__search}
              value={searchValue}
              onKeyDown={(e) => keyDownHandler(e)}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>

          <Login />
        </div>
        <button
          className={cn(styles.header__burger, {
            [styles.header__burger_active]: isBurgerVisible,
          })}
          type='button'
          aria-label='burger menu open button'
          onClick={burgerHandler}
        ></button>
      </div>
    </header>
  );
};
