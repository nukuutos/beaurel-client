import Cog from '../../../base/icons/cog';
import Dialog from '../../../base/icons/dialog';
import FarCalendarAlt from '../../../base/icons/far-calendar-alt';
import Heart from '../../../base/icons/heart';
import Search from '../../../base/icons/search';
import User from '../../../base/icons/user';

const customerNavbarLinks = ({ username, customerId }) => {
  const profilePath = username ? [`/${username}`, `/${customerId}`] : [`/${customerId}`];

  return [
    { name: 'Профиль', path: profilePath, IconComponent: <User className="navbar__icon" /> },
    { name: 'Поиск', path: '/search', IconComponent: <Search className="navbar__icon" /> },
    {
      name: 'Записи',
      path: '/appointments',
      IconComponent: <FarCalendarAlt className="navbar__icon" />,
    },
    { name: 'Сообщения', path: '/messages', IconComponent: <Dialog className="navbar__icon" /> },
    { name: 'Твои Мастера', path: '/masters', IconComponent: <Heart className="navbar__icon" /> },
    { name: 'Настройки', path: '/settings', IconComponent: <Cog className="navbar__icon" /> },
  ];
};

export default customerNavbarLinks;
