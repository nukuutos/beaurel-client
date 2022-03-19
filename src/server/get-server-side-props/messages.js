import { setDialogs } from '../../redux/messages/actions';
import { wrapper } from '../../redux/store';
import handleAuthPage from '../../utils/auth/handle-auth-page/handle-auth-page';
import Message from '../models/message';
import handleGlobalState from './utils/handle-global-state';

const getMessagesServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const user = await handleAuthPage(req, res, store);

  const data = await Message.getDialogs(user.id);

  const { globalData, dialogs } = data;

  handleGlobalState({ user, globalData, store });

  store.dispatch(setDialogs({ dialogs }));

  return { props: {} };
});

export default getMessagesServerSideProps;
