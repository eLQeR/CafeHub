'use client';
import React from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          <Link href='/' className={styles.footer__link}>
            github
          </Link>
          <Link href='/' className={styles.footer__link}>
            contacts
          </Link>
          <Link href='/' className={styles.footer__link}>
            rights
          </Link>
        </div>
        <div className={styles.footer__bot}>
          &copy;
          <Image
            src='/img/logo.png'
            width={94}
            height={24}
            alt='logo'
            className={styles.footer__logo}
          />
          {new Date().getFullYear()}. Всі права захищені.
        </div>
        <button
          className={styles.footer__backToTop}
          onClick={() => {
            window.scrollTo({
              top: 0,
            });
          }}
        ></button>
      </div>
    </footer>
  );
};
