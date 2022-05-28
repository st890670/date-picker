import { all } from "redux-saga/effects";

import dateSaga from "redux/saga/dateSaga";

export default function* rootSaga() {
  yield all([...dateSaga]);
}
