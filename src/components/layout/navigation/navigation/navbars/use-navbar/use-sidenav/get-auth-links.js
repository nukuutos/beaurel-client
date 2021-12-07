const getAuthLinks = (userId) => [
  { name: 'Профиль', path: `/${userId}`, icon: 'user-alt' },
  { name: 'Записи', path: '/appointments', icon: ['far', 'calendar-alt'] },
  { name: 'Поиск', path: '/search', icon: 'search' },
  { name: 'Твои Мастера', path: '/masters', icon: 'star' },
];

export default getAuthLinks;
