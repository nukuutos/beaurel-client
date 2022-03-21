import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import ActiveUser from '../components/pages/messages/active-user/active-user';
import Dialog from '../components/pages/messages/dialog/dialog';
import FavoriteMasters from '../components/pages/messages/favorite-masters/favorite-masters';
import Dialogs from '../components/pages/messages/dialogs/dialogs';
import MessageForm from '../components/pages/messages/message-form/message-form';
import useMessagesState from '../components/pages/messages/use-messages-states';
import Header from '../components/pages/messages/header';
import getMessagesServerSideProps from '../server/get-server-side-props/messages';

const Messages = () => {
  const { activeInterlocutor } = useSelector((state) => state.messages);
  const [isFavoriteMasters, className, stateFunctions] = useMessagesState();

  const { _id: interlocutorId } = activeInterlocutor;

  return (
    <Layout>
      <main className={`content messages ${className}`}>
        <Header {...stateFunctions} />

        {interlocutorId && <ActiveUser />}

        <div className="messages__line messages__line--horizontal" />
        <div className="messages__line messages__line--vertical" />

        <Dialogs {...stateFunctions} />
        <Dialog />

        {interlocutorId && <MessageForm />}

        {isFavoriteMasters && <FavoriteMasters {...stateFunctions} />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = getMessagesServerSideProps;

export default Messages;
