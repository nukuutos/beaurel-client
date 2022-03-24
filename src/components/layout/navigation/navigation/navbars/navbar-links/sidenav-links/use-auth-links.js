import { useSelector } from 'react-redux';

const useAuthLinks = () => {
  const { id: userId, username } = useSelector((state) => state.auth);

  const profilePath = username ? [`/${username}`, `/${userId}`] : [`/${userId}`];

  return [
    { name: 'Профиль', path: profilePath, icon: 'user-alt' },
    { name: 'Записи', path: '/appointments', icon: ['far', 'calendar-alt'] },
    { name: 'Поиск', path: '/search', icon: 'search' },
    { name: 'Твои Мастера', path: '/masters', icon: 'heart' },
  ];
};

export default useAuthLinks;
