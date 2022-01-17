import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import handleAuthPage from '../utils/auth/handle-auth-page/handle-auth-page';
import ActiveUser from '../components/pages/messages/active-user';
import Dialog from '../components/pages/messages/dialog/dialog';
import FavoriteMasters from '../components/pages/messages/favorite-masters/favorite-masters';
import Dialogs from '../components/pages/messages/dialogs/dialogs';
import MessageForm from '../components/pages/messages/message-form/message-form';
import Message from '../server/models/message';
import { setDialogs } from '../redux/messages/actions';
import useMessagesState from '../components/pages/messages/use-messages-states';
import Header from '../components/pages/messages/header';

const Messages = () => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const [{ activeDialog, isFavoriteMasters }, className, stateFunctions] = useMessagesState();
  const { interlocutorId } = activeDialog;

  return (
    <Layout>
      <main className={`content messages ${className} ${!isPhone ? 'card card--layout' : ''}`}>
        <Header {...stateFunctions} />

        {interlocutorId && <ActiveUser activeDialog={activeDialog} />}

        <div className="messages__line messages__line--horizontal mb-1" />
        <div className="messages__line messages__line--vertical" />

        <Dialogs activeDialog={activeDialog} {...stateFunctions} />
        <Dialog activeDialog={activeDialog} />

        {interlocutorId && <MessageForm activeDialog={activeDialog} />}

        {isFavoriteMasters && <FavoriteMasters {...stateFunctions} />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const userId = await handleAuthPage(req, res, store);

  const dialogs = await Message.getDialogs(userId);

  store.dispatch(setDialogs({ dialogs }));

  return { props: { dialogs } };
});

export default Messages;
