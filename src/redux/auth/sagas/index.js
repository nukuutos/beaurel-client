import { all, call } from 'redux-saga/effects';

import onSignIn from './sign-in';
import onRefreshToken from './refresh-token';
import onAuthMonitor from './auth-monitor';

export default function* authSagas() {
  yield all([call(onSignIn), call(onRefreshToken), call(onAuthMonitor)]);
}
