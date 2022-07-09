import Link from 'next/link';
import React from 'react';

const Navigation = () => (
  <nav className="landing__navigation">
    <ul className="landing__navigation-list">
      <li className="landing__nav-item">
        <Link prefetch={false} href="/search">
          <a>Поиск</a>
        </Link>
      </li>
      <li className="landing__nav-item">
        <Link prefetch={false} href="/sign-up">
          <a>Регистрация</a>
        </Link>
      </li>
      <li className="landing__nav-item">
        <Link prefetch={false} href="/sign-in">
          <a>Войти</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
