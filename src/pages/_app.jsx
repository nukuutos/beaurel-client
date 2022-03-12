import React from 'react';

import 'regenerator-runtime/runtime';

import '../utils/dayjs-plugins';
import '../utils/super-json/dayjs';

import { wrapper } from '../redux/store';

import '../utils/font-awesome';
import '../sass/main.scss';
import useScreenSize from '../hooks/use-screen-size';
import useSocket from '../hooks/use-socket';

const WrappedApp = ({ Component, pageProps }) => {
  useScreenSize();
  useSocket();

  return <Component {...pageProps} />;
};
export default wrapper.withRedux(WrappedApp);
