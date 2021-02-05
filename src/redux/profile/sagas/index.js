import { all, call } from 'redux-saga/effects';

import onGetProfile from './profile';
import onUpdateAboutText from './about-text';
import onGetMasters from './get-masters';

export default function* profileSagas() {
  yield all([call(onGetMasters), call(onGetProfile), call(onUpdateAboutText)]);
}
