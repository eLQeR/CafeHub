'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import cn from 'classnames';
import { Login } from '../Login';

export const Header = () => {
  const [isBurgerVisible, setIsBurgerVisible] = useState(false);
  const pathname = usePathname();
  const linkList = [
    {
      id: 0,
      link: '/',
      label: 'Home',
    },
    {
      id: 1,
      link: '/places',
      label: 'Places',
    },
    {
      id: 2,
      link: '/events',
      label: 'Events',
    },
    {
      id: 3,
      link: '/about',
      label: 'About',
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

        <div className={styles.header__searchContainer}>
          <input
            type='text'
            placeholder='Search...'
            className={styles.header__search}
          />
        </div>
        <Link href={'/signup'}>Reg</Link>
        <Link href={'/signin'}>Sign In</Link>
        <Login />
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
