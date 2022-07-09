import React from 'react';
import Home from '../../../../../../base/icons/home';
import Search from '../../../../../../base/icons/search';
import User from '../../../../../../base/icons/user';
import UserPlus from '../../../../../../base/icons/user-plus';

const publicLinks = [
  { name: 'Войти', path: '/sign-in', IconComponent: <User className="mobile-navbar__icon" /> },
  {
    name: 'Зарегистрироваться',
    path: '/sign-up',
    IconComponent: <UserPlus className="mobile-navbar__icon" />,
  },
  { name: 'Поиск', path: '/search', IconComponent: <Search className="mobile-navbar__icon" /> },
  { name: 'Главная', path: '/', IconComponent: <Home className="mobile-navbar__icon" /> },
];

export default publicLinks;
