import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  plusDay,
  plusMonth,
  plusYear,
  setupDate,
  successForSetup,
  switchDate,
  prevRelatedYear,
  nextRelatedYear,
  plusRelatedYear,
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

  const firstOfRelatedYear = Math.floor(year / 10) * 10 - 1;
  const relatedYear = new Array(12)
    .fill(0)
    .map((_, index) => firstOfRelatedYear + index);

  yield put(
    successForSetup({
      selectedDate: {
        year,
        month,
        week,
        day,
      },
      relatedDate,
      relatedYear,
    })
  );
}

function* switchDateSaga(action) {
  const { payload: targetDate } = action;
  yield call(updateDate, targetDate);
}

function* plusDaySaga(action) {
  const dayAmount = action.payload;
  const selectedDate = yield select((state) => state.date.selectedDate);
  const { year, month, day } = selectedDate;
  const selectedDateTime = new Date(`${year}-${month}-${day}`).getTime();
  const prevDate = new Date(
    selectedDateTime + dayAmount * (24 * 60 * 60 * 1000)
  );
  yield call(updateDate, convertDateToObj(prevDate));
}

function* plusMonthSaga(action) {
  const monthAmount = action.payload;
  const selectedDate = yield select((state) => state.date.selectedDate);
  const { year, month } = selectedDate;
  const newMonth = Math.abs(month + monthAmount) % 12 || 12;

  yield call(
    updateDate,
    convertDateToObj(new Date(`${year}-${newMonth}-${1}`))
  );
}

function* plusYearSaga(action) {
  const yearAmount = action.payload;
  const selectedDate = yield select((state) => state.date.selectedDate);
  const { year, month } = selectedDate;

  yield call(
    updateDate,
    convertDateToObj(new Date(`${year + yearAmount}-${month}-${1}`))
  );
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

function* prevRelatedYearSaga() {
  yield call(updateRelatedYearSage, -10);
}

function* nextRelatedYearSaga() {
  yield call(updateRelatedYearSage, 10);
}

function* updateRelatedYearSage(amount = 0) {
  const { relatedYear, selectedDate } = yield select((state) => state.date);

  yield put(
    plusRelatedYear({
      relatedYear: relatedYear.map((num) => num + amount),
      selectedDate: {
        ...selectedDate,
        year: selectedDate.year + amount,
        day: 1,
      },
    })
  );
}

function* watchSetupDate() {
  yield takeLatest(setupDate, setupDateSaga);
}

function* watchSwitchDate() {
  yield takeLatest(switchDate, switchDateSaga);
}

function* watchPlusDay() {
  yield takeLatest(plusDay, plusDaySaga);
}

function* watchPlusMonth() {
  yield takeLatest(plusMonth, plusMonthSaga);
}

function* watchPlusYear() {
  yield takeLatest(plusYear, plusYearSaga);
}

function* watchPrevRelatedYear() {
  yield takeLatest(prevRelatedYear, prevRelatedYearSaga);
}

function* watchNextRelatedYear() {
  yield takeLatest(nextRelatedYear, nextRelatedYearSaga);
}

const all = [
  watchSetupDate(),
  watchSwitchDate(),
  watchPlusDay(),
  watchPlusMonth(),
  watchPlusYear(),
  watchPrevRelatedYear(),
  watchNextRelatedYear(),
];

export default all;
