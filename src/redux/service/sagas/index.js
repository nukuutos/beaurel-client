import { call, all } from 'redux-saga/effects';

import onGetServices from './get-services';
import onAddService from './add-service';
import onDeleteService from './delete-services';
import onUpdateService from './update-service';

export default function* servicesSagas() {
  yield all([call(onGetServices), call(onAddService), call(onDeleteService), call(onUpdateService)]);
}
