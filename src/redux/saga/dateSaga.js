import { takeLatest } from "redux-saga/effects";
import { updateDate } from "redux/slice/dateSlice";

function* updateDateSaga() {}

function* watchUpdateDate() {
  yield takeLatest(updateDate, updateDateSaga);
}

const all = [watchUpdateDate()];

export default all;
