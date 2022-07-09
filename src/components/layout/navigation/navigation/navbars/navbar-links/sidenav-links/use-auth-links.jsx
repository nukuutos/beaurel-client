import { useSelector } from 'react-redux';
import Dialog from '../../../../../../base/icons/dialog';
import FarCalendar from '../../../../../../base/icons/far-calendar';
import FarCalendarAlt from '../../../../../../base/icons/far-calendar-alt';
import Heart from '../../../../../../base/icons/heart';
import User from '../../../../../../base/icons/user';

// { name: 'Профиль', path: profilePath, IconComponent: <User className="navbar__icon" /> },
// { name: 'Поиск', path: '/search', IconComponent: <Search className="navbar__icon" /> },
// {
//   name: 'Записи',
//   path: '/appointments',
//   IconComponent: <FarCalendarAlt className="navbar__icon" />,
// },
// { name: 'Сообщения', path: '/messages', IconComponent: <Dialog className="navbar__icon" /> },
// { name: 'Твои Мастера', path: '/masters', IconComponent: <Heart className="navbar__icon" /> },
// { name: 'Настройки', path: '/settings', IconComponent: <Cog className="navbar__icon" /> },

const masterLinks = (profilePath) => [
  { name: 'Профиль', path: profilePath, IconComponent: <User className="mobile-navbar__icon" /> },
  {
    name: 'Записи',
    path: '/appointments',
    IconComponent: <FarCalendarAlt className="mobile-navbar__icon" />,
  },
  {
    name: 'Сообщения',
    path: '/messages',
    IconComponent: <Dialog className="mobile-navbar__icon" />,
  },
  {
    name: 'Расписание',
    path: '/timetable',
    IconComponent: <FarCalendar className="mobile-navbar__icon" />,
  },
];

const customerLinks = (profilePath) => [
  { name: 'Профиль', path: profilePath, IconComponent: <User className="mobile-navbar__icon" /> },
  {
    name: 'Записи',
    path: '/appointments',
    IconComponent: <FarCalendarAlt className="mobile-navbar__icon" />,
  },
  {
    name: 'Сообщения',
    path: '/messages',
    IconComponent: <Dialog className="mobile-navbar__icon" />,
  },
  {
    name: 'Твои Мастера',
    path: '/masters',
    IconComponent: <Heart className="mobile-navbar__icon" />,
  },
];

const useAuthLinks = () => {
  const { id: userId, username, role } = useSelector((state) => state.auth);

  const profilePath = username ? [`/${username}`, `/${userId}`] : [`/${userId}`];

  return role === 'master' ? masterLinks(profilePath) : customerLinks(profilePath);
};

export default useAuthLinks;
