import Head from 'next/head';

import { useSelector } from 'react-redux';
import Navigation from './navigation';
import Alerts from './alerts';

import City from './city/city';
import Footer from './footer';
import NoMasterTools from '../base/no-master-tools/no-master-tools';
import useHandleRouting from './hooks/use-handle-routing';
import useHandleAndroidBackButton from './hooks/use-handle-android-back-button';
import useMessengerClassName from './hooks/use-messenger-class-name';
import DisplayLayoutContent from './display-layout-content';

const Layout = ({ children }) => {
  const [{ id: userId }, { isOpen }] = useSelector((state) => [state.auth, state.masterTools]);
  const messengerClassName = useMessengerClassName();

  useHandleRouting();
  useHandleAndroidBackButton();

  return (
    <>
      <div className={`layout ${messengerClassName}`}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        {isOpen && <NoMasterTools timetableCase />}

        {!userId && <City />}

        <DisplayLayoutContent>{children}</DisplayLayoutContent>

        <Navigation />

        <Footer />
      </div>
      <Alerts />
    </>
  );
};

export default Layout;
