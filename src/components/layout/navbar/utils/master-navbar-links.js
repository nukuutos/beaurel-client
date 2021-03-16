const masterNavbarLinks = (masterId) => [
  { name: 'Профиль', path: `/${masterId}`, icon: 'user-alt' },
  { name: 'Поиск', path: '/search', icon: 'search' },
  { name: 'Записи', path: '/appointments', icon: ['far', 'calendar-alt'] },
  { name: 'Услуги', path: '/services', icon: 'stream' },
  { name: 'Расписание', path: '/timetable', icon: ['far', 'calendar'] },
  { name: 'Твои Мастера', path: '/masters', icon: 'star' },
  { name: 'Настройки', path: '/settings', icon: 'cog' },
];

export default masterNavbarLinks;
