import { all } from 'redux-saga/effects';
import { songsSaga } from './songsSaga';

export function* rootSaga() {
  yield all([
    songsSaga(),
  ]);
}