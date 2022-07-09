import Cog from '../../../base/icons/cog';
import Dialog from '../../../base/icons/dialog';
import FarCalendar from '../../../base/icons/far-calendar';
import FarCalendarAlt from '../../../base/icons/far-calendar-alt';
import Heart from '../../../base/icons/heart';
import Search from '../../../base/icons/search';
import Stream from '../../../base/icons/stream';
import User from '../../../base/icons/user';

const masterNavbarLinks = ({ username, masterId }) => {
  const profilePath = username ? [`/${username}`, `/${masterId}`] : [`/${masterId}`];

  return [
    { name: 'Профиль', path: profilePath, IconComponent: <User className="navbar__icon" /> },
    { name: 'Поиск', path: '/search', IconComponent: <Search className="navbar__icon" /> },
    {
      name: 'Записи',
      path: '/appointments',
      IconComponent: <FarCalendarAlt className="navbar__icon" />,
    },
    { name: 'Сообщения', path: '/messages', IconComponent: <Dialog className="navbar__icon" /> },
    { name: 'Услуги', path: '/services', IconComponent: <Stream className="navbar__icon" /> },
    {
      name: 'Расписание',
      path: '/timetable',
      IconComponent: <FarCalendar className="navbar__icon" />,
    },
    { name: 'Твои Мастера', path: '/masters', IconComponent: <Heart className="navbar__icon" /> },
    { name: 'Настройки', path: '/settings', IconComponent: <Cog className="navbar__icon" /> },
  ];
};

export default masterNavbarLinks;
