import { call, all } from 'redux-saga/effects';

import onGetWorks from './get-works';

export default function* workSagas() {
  yield all([call(onGetWorks)]);
}
