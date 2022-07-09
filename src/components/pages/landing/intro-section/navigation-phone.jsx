import Link from 'next/link';
import React from 'react';

const NavigationPhone = ({ toggleScroll }) => (
  <div className="landing-phone-navigation">
    <input
      onClick={toggleScroll}
      type="checkbox"
      id="phone-navigation-checkbox"
      className="landing-phone-navigation__checkbox"
    />

    <label htmlFor="phone-navigation-checkbox" className="landing-phone-navigation__label">
      <div className="landing-phone-navigation__bar landing-phone-navigation__bar--1" />
      <div className="landing-phone-navigation__bar landing-phone-navigation__bar--2" />
      <div className="landing-phone-navigation__bar landing-phone-navigation__bar--3" />
    </label>

    <div className="landing-phone-navigation__background" />

    <nav className="landing-phone-navigation__menu">
      <ul className="landing-phone-navigation__list">
        <li className="landing-phone-navigation__item landing-phone-navigation__item--1">
          <Link prefetch={false} href="/sign-in">
            <a>
              01 <span className="landing-phone-navigation__link">Войти</span>
            </a>
          </Link>
        </li>
        <li className="landing-phone-navigation__item landing-phone-navigation__item--2">
          <Link prefetch={false} href="/sign-up">
            <a>
              02 <span className="landing-phone-navigation__link">Регистрация</span>
            </a>
          </Link>
        </li>
        <li className="landing-phone-navigation__item landing-phone-navigation__item--3">
          <Link prefetch={false} href="/search">
            <a>
              03 <span className="landing-phone-navigation__link">Поиск</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default NavigationPhone;
