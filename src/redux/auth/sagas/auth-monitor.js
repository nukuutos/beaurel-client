import { take, put, race, takeEvery } from 'redux-saga/effects';
import { getSuccessType, getFailType } from '../../utils/action';
import { refreshTokenStart, refreshTokenSuccess, refreshTokenFailure, signOut } from '../actions';

const ignoredTypes = ['SIGN_IN', 'SIGN_UP', 'REFRESH_TOKEN'];

const monitorableAction = (action) => {
  return action.type.includes('START') && ignoredTypes.every((fragment) => !action.type.includes(fragment));
};

function* monitor(monitoredAction) {
  const { failRequest } = yield race({
    successRequest: take(getSuccessType(monitoredAction)),
    failRequest: take(getFailType(monitoredAction)),
  });

  if (failRequest && failRequest.payload.response.status === 401) {
    console.log('detected 401, refreshing token');
    yield put(refreshTokenStart());

    const { isRefreshSuccess } = yield race({
      isRefreshSuccess: take(refreshTokenSuccess().type),
      isRefreshFail: take(refreshTokenFailure().type),
    });

    if (isRefreshSuccess) yield put(monitoredAction);
    else yield put(signOut());
  }
}

export default function* onAuthMonitor() {
  yield takeEvery(monitorableAction, monitor);
}
