import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const getAppointmentsNotification = (users) => {
  for (const user in users) {
    for (const status in users[user]) {
      if (users[user][status]) return true;
    }
  }

  return false;
};

const useIsNotificationClassName = (linkPath) => {
  const [{ isNotification: messageNotification }, { isNotification: appointmentNotification }] =
    useSelector((state) => [state.messages, state.appointments]);

  let isNotification;
  if (linkPath === '/messages') isNotification = messageNotification;
  else if (linkPath === '/appointments') isNotification = appointmentNotification;

  const isMessageNotification = linkPath === '/messages' && isNotification;
  const isAppointmentNotification =
    linkPath === '/appointments' && getAppointmentsNotification(isNotification);

  const isNotificationClassName = isMessageNotification || isAppointmentNotification;

  return isNotificationClassName;
};

const useGetClassName = (linkPath) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const isNotification = useIsNotificationClassName(linkPath);

  let className = 'mobile-navbar__item';
  if (currentPath === linkPath) className += ' mobile-navbar__item--active';
  if (isNotification) className += ' mobile-navbar__item--notification';

  return className;
};

export default useGetClassName;
