// users = {customer, master}
const getAppointmentsNotification = (users) => {
  for (const user in users) {
    for (const status in users[user]) {
      if (users[user][status]) return true;
    }
  }

  return false;
};

const getClassName = (routerPath, linkPath, isNotification, routingData, isDesktop) => {
  const isMessageNotification = linkPath === '/messages' && isNotification;
  const isAppointmentNotification =
    linkPath === '/appointments' && getAppointmentsNotification(isNotification);

  const isNotificationClassName = isMessageNotification || isAppointmentNotification;
  const { isLoading, url } = routingData;

  let className = 'navbar__link';
  if (routerPath === linkPath) className += ' navbar__link--active';
  if (isDesktop && isLoading && url === linkPath) className += ' navbar__link--loading';
  if (isNotificationClassName) className += ' navbar__link--notification';

  return className;
};

export default getClassName;
