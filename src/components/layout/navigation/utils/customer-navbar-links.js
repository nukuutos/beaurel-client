const customerNavbarLinks = ({ username, customerId }) => {
  const profilePaths = username ? [`/${username}`, `/${customerId}`] : [`/${customerId}`];

  return [
    { name: 'Профиль', path: profilePaths, icon: 'user-alt' },
    { name: 'Поиск', path: '/search', icon: 'search' },
    { name: 'Записи', path: '/appointments', icon: ['far', 'calendar-alt'] },
    { name: 'Сообщения', path: '/messages', icon: 'comment' },
    { name: 'Твои Мастера', path: '/masters', icon: 'heart' },
    { name: 'Настройки', path: '/settings', icon: 'cog' },
  ];
};

export default customerNavbarLinks;
