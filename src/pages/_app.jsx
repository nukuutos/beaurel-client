import React from 'react';

import '../utils/dayjs-plugins';

import { wrapper } from '../redux/store';

import '../sass/main.scss';

const WrappedApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(WrappedApp);
