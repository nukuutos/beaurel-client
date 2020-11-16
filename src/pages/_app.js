import React from 'react';

import { wrapper } from '../redux/store';

import '../utils/font-awesome';
import '../sass/main.scss';

const WrappedApp = ({ Component, pageProps }) => <Component {...pageProps} />;
export default wrapper.withRedux(WrappedApp);
