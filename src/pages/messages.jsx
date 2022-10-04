import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

import useMessagesState from '../components/pages/messages/use-messages-states';
import Layout from '../components/layout/layout';

import getMessagesServerSideProps from '../server/get-server-side-props/messages';

const ActiveUser = dynamic(() => import('../components/pages/messages/active-user/active-user'));
const Dialog = dynamic(() => import('../components/pages/messages/dialog/dialog'));
const Dialogs = dynamic(() => import('../components/pages/messages/dialogs/dialogs'));
const MessageForm = dynamic(() => import('../components/pages/messages/message-form/message-form'));
const Header = dynamic(() => import('../components/pages/messages/header'));
const FavoriteMasters = dynamic(() =>
  import('../components/pages/messages/favorite-masters/favorite-masters')
);

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
