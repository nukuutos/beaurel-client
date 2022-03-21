import 'regenerator-runtime/runtime';

import '../utils/dayjs-plugins';
import '../utils/super-json/dayjs';

import { wrapper } from '../redux/store';

import '../utils/font-awesome';
import '../sass/main.scss';
import useScreenSize from '../hooks/use-screen-size';
import useSocket from '../hooks/use-socket';
import useUpdateStatus from '../hooks/use-update-status';
import useDetectTimezone from '../hooks/use-detect-timezone';

const WrappedApp = ({ Component, pageProps }) => {
  useScreenSize();
  useUpdateStatus();
  useDetectTimezone();
  useSocket();

  return <Component {...pageProps} />;
};
export default wrapper.withRedux(WrappedApp);
