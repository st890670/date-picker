import { takeLatest, put, select, call } from "redux-saga/effects";
import {
  setupDate,
  switchDate,
  switchDay,
  successForSetup,
  updateSelectedDate,
} from "redux/slice/dateSlice";
import { convertDateToObj } from "util/dateUtil";

function* setupDateSaga(action) {
  const { payload: selectedDate } = action;
  const { year, month, week, day } = convertDateToObj(selectedDate);
  const firstDayOfCurrentMonth = new Date(`${year}-${month}-01`);
  const relatedDate = new Array(42).fill(0).map((_, index) => {
    const diffDay = index - firstDayOfCurrentMonth.getDay();
    const targetDate = new Date(
      firstDayOfCurrentMonth.getTime() + diffDay * 24 * 60 * 60 * 1000
    );
    return convertDateToObj(targetDate);
  });

  yield put(
    successForSetup({
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
  const { payload: targetDate } = action;
  yield call(updateDate, targetDate);
}

function* switchDaySaga(action) {
  const dayAmount = action.payload;
  console.log(dayAmount);
  const selectedDate = yield select((state) => state.date.selectedDate);
  const { year, month, day } = selectedDate;
  const selectedDateTime = new Date(`${year}-${month}-${day}`).getTime();
  const prevDate = new Date(
    selectedDateTime + dayAmount * (24 * 60 * 60 * 1000)
  );
  yield call(updateDate, convertDateToObj(prevDate));
}

function* updateDate(targetDate) {
  const prevSelectedDate = yield select((state) => state.date.selectedDate);
  const { year, month, day } = targetDate;
  if (prevSelectedDate.month !== month || prevSelectedDate.year !== year) {
    yield put(setupDate(new Date(`${year}-${month}-${day}`)));
  } else {
    yield put(updateSelectedDate(targetDate));
  }
}

function* watchSetupDate() {
  yield takeLatest(setupDate, setupDateSaga);
}

function* watchSwitchDate() {
  yield takeLatest(switchDate, switchDateSaga);
}

function* watchSwitchDay() {
  yield takeLatest(switchDay, switchDaySaga);
}

const all = [watchSetupDate(), watchSwitchDate(), watchSwitchDay()];

export default all;
