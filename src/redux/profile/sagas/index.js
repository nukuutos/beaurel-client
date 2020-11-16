import { all, call } from 'redux-saga/effects';

import onGetProfile from './profile';
import onUpdateAboutText from './about-text';

export default function* profileSagas() {
  yield all([call(onGetProfile), call(onUpdateAboutText)]);
}
