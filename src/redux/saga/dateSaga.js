import { takeLatest, put, select } from "redux-saga/effects";
import {
  setupDate,
  switchDate,
  successForSetup,
  updateSelectedDate,
} from "redux/slice/dateSlice";

function* setupDateSaga(action) {
  const { payload: date } = action;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const week = date.getDay();
  const day = date.getDate();

  const firstDayOfCurrentMonth = new Date(`${year}-${month}-01`);
  const relatedDate = new Array(42).fill(0).map((_, index) => {
    const diffDay = index - firstDayOfCurrentMonth.getDay();
    const targetDate = new Date(
      firstDayOfCurrentMonth.getTime() + diffDay * 24 * 60 * 60 * 1000
    );

    return {
      year: targetDate.getFullYear(),
      month: targetDate.getMonth() + 1,
      week: targetDate.getDay(),
      day: targetDate.getDate(),
    };
  });

  yield put(
    successForSetup({
      currentDate: {
        year,
        month,
        week,
        day,
      },
      selectedDate: {
        year,
        month,
        week,
        day,
      },
      relatedDate,
    })
  );
}

function* switchDateSaga(action) {
  const { payload } = action;
  const { year, month, day } = payload;
  const prevSelectedDate = yield select((state) => state.date.selectedDate);
  if (prevSelectedDate.month !== month || prevSelectedDate.year !== year) {
    yield put(setupDate(new Date(`${year}-${month}-${day}`)));
  } else {
    yield put(updateSelectedDate(payload));
  }
}

function* watchSetupDate() {
  yield takeLatest(setupDate, setupDateSaga);
}

function* watchSwitchDate() {
  yield takeLatest(switchDate, switchDateSaga);
}

const all = [watchSetupDate(), watchSwitchDate()];

export default all;
