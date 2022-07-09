import Head from 'next/head';

import { useSelector } from 'react-redux';

import dynamic from 'next/dynamic';

import DisplayLayoutContent from './display-layout-content';

import useHandleRouting from './hooks/use-handle-routing';
import useHandleAndroidBackButton from './hooks/use-handle-android-back-button';
// import useUpdateStatus from '../../hooks/use-update-status';
// import useDetectTimezone from '../../hooks/use-detect-timezone';
// import useSocket from '../../hooks/use-socket';
import useScreenSize from '../../hooks/use-screen-size';
import useMessengerClassName from './hooks/use-messenger-class-name';
import usePageTitle from '../../hooks/use-page-title';

const ComponentForHooks = dynamic(() => import('./component-for-hooks'));
const Navigation = dynamic(() => import('./navigation'));
const Alerts = dynamic(() => import('./alerts'));
const City = dynamic(() => import('./city/city'));
const NoMasterTools = dynamic(() => import('../base/no-master-tools/no-master-tools'));
const Footer = dynamic(() => import('./footer'));

const Layout = ({ children }) => {
  const [{ id: userId }, { isOpen }] = useSelector((state) => [state.auth, state.masterTools]);
  const messengerClassName = useMessengerClassName();
  const { title, description } = usePageTitle();

  useScreenSize();
  useHandleRouting();
  useHandleAndroidBackButton();

  return (
    <>
      <div className={`layout ${messengerClassName}`}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>

        <ComponentForHooks />

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
