import React from 'react';
import Home from '../../../base/icons/home';
import Search from '../../../base/icons/search';
import User from '../../../base/icons/user';
import UserPlus from '../../../base/icons/user-plus';

export default [
  { name: 'Войти', path: '/sign-in', IconComponent: <User className="navbar__icon" /> },
  { name: 'Регистрация', path: '/sign-up', IconComponent: <UserPlus className="navbar__icon" /> },
  { name: 'Поиск', path: '/search', IconComponent: <Search className="navbar__icon" /> },
  { name: 'Главная', path: '/', IconComponent: <Home className="navbar__icon" /> },
];
