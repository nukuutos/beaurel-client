import React, { useEffect } from 'react';
import Head from 'next/head';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Navigation from './navigation';
import Alerts from './alerts';

import City from './city/city';
import Footer from './footer';
import NoMasterTools from '../base/no-master-tools/no-master-tools';
import { changePageFinish, changePageStart } from '../../redux/routing/actions';
import { addAlert } from '../../redux/alerts/actions';
import useLoadingOnRouting from '../../hooks/use-loading-on-routing';

const Layout = ({ children }) => {
  const [{ id: userId }, { isOpen }, { _id: interlocutorId }] = useSelector((state) => [
    state.auth,
    state.masterTools,
    state.messages.activeInterlocutor,
  ]);

  const isPageLoading = useLoadingOnRouting();
  const router = useRouter();
  const dispatch = useDispatch();

  const messengerLayoutClassName =
    router.pathname === '/messages' && interlocutorId ? 'layout--messenger' : '';

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      dispatch(changePageStart(url));
    };

    const handleRouteChangeComplete = () => {
      dispatch(changePageFinish());
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { close } = useSelector((state) => state.modal);

  useEffect(() => {
    router.beforePopState((state) => {
      if (!close) return true;
      close();
      history.pushState(state, '');
      router.replace(router.pathname, router.asPath, { shallow: true });
      return false;
    });
  }, [dispatch, router, close]);

  return (
    <>
      <div className={`layout ${messengerLayoutClassName}`}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        {isOpen && <NoMasterTools timetableCase />}

        {!userId && <City />}

        {isPageLoading ? (
          <div className="content content--loading">
            <div className="spinner-with-background" />
          </div>
        ) : (
          children
        )}

        <Navigation />

        <Footer />
      </div>
      <Alerts />
    </>
  );
};

export default Layout;
