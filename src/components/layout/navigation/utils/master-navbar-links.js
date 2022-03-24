const masterNavbarLinks = ({ username, masterId }) => {
  const profilePath = username ? [`/${username}`, `/${masterId}`] : [`/${masterId}`];

  return [
    { name: 'Профиль', path: profilePath, icon: 'user-alt' },
    { name: 'Поиск', path: '/search', icon: 'search' },
    { name: 'Записи', path: '/appointments', icon: ['far', 'calendar-alt'] },
    { name: 'Сообщения', path: '/messages', icon: 'comment' },
    { name: 'Услуги', path: '/services', icon: 'stream' },
    { name: 'Расписание', path: '/timetable', icon: ['far', 'calendar'] },
    { name: 'Твои Мастера', path: '/masters', icon: 'heart' },
    { name: 'Настройки', path: '/settings', icon: 'cog' },
  ];
};

export default masterNavbarLinks;
