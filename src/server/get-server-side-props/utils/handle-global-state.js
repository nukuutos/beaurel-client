import { setAppointmentsNotifications } from '../../../redux/slices/appointments';
import { getFavorites } from '../../../redux/slices/favorites';
import { setMasterTools } from '../../../redux/slices/master-tools';
import { setMessageNotification } from '../../../redux/slices/messages';

const handleNotifications = (notifications, store) => {
  if (!notifications) return;

  const { messages, appointments } = notifications;

  if (messages) store.dispatch(setMessageNotification());
  if (appointments) {
    store.dispatch(setAppointmentsNotifications({ notifications: appointments }));
  }
};

const handleMasterTools = ({ role, tools, store }) => {
  if (role !== 'master' || !tools) return;
  store.dispatch(setMasterTools(tools));
};

const handleFavorites = (favorites, store) => {
  if (!favorites) return;
  store.dispatch(getFavorites(favorites));
};

const handleGlobalState = ({ user, globalData, store }) => {
  if (!globalData) return;

  const { role } = user;
  const { tools, notifications, favorites } = globalData;

  handleNotifications(notifications, store);
  handleMasterTools({ role, tools, store });
  handleFavorites(favorites, store);
};

export default handleGlobalState;
