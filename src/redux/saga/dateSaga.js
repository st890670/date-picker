import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  setupDate,
  successForSetup,
  switchDate,
  prevMonth,
  nextMonth,
  updateRelatedDate,
  prevYear,
  nextYear,
  updateRelatedMonth,
  prevRelatedYear,
  nextRelatedYear,
  updateRelatedYear,
} from "redux/slice/dateSlice";
import { convertDateToObj } from "util/dateUtil";

function* setupDateSaga(action) {
  const { payload: selectedDate } = action;
  const dateObj = convertDateToObj(selectedDate);
  const { year, month } = dateObj;
  const relatedYear = buildRelatedYear(year);
  const relatedMonth = buildRelatedMonth(year);
  const relatedDate = buildRelatedDate(year, month);
  yield put(
    successForSetup({
      selectedDate: { ...dateObj },
      relatedDate: { target: { year, month }, payload: relatedDate },
      relatedYear,
      relatedMonth,
    })
  );
}

function buildRelatedYear(year) {
  const firstOfRelatedYear = Math.floor(year / 10) * 10 - 1;
  return new Array(12).fill(0).map((_, index) => firstOfRelatedYear + index);
}

function buildRelatedMonth(year) {
  return new Array(12).fill(0).map((_, index) => ({ year, month: index + 1 }));
}

function buildRelatedDate(year, month) {
  const firstDayOfCurrentMonth = new Date(`${year}/${month}/01`);
  return new Array(42).fill(0).map((_, index) => {
    const diffDay = index - firstDayOfCurrentMonth.getDay();
    const targetDate = new Date(
      firstDayOfCurrentMonth.getTime() + diffDay * 24 * 60 * 60 * 1000
    );
    return convertDateToObj(targetDate);
  });
}

function* switchDateSaga(action) {
  const { year, month, day } = action.payload;
  yield put(setupDate(new Date(`${year}/${month}/${day}`)));
}

function* prevMonthSaga() {
  yield call(updateRelatedDateSaga, false);
}

function* nextMonthSaga() {
  yield call(updateRelatedDateSaga, true);
}

function* updateRelatedDateSaga(isNext) {
  const { relatedDate } = yield select((state) => state.date);
  const { year, month } = relatedDate.target;

  let newYear = year;
  if (isNext) {
    newYear += month + 1 > 12 ? 1 : 0;
  } else {
    newYear += month - 1 < 1 ? -1 : 0;
  }

  const newMonth = (month + (isNext ? 1 : -1)) % 12 || 12;
  yield put(
    updateRelatedDate({
      target: { year: newYear, month: newMonth },
      payload: buildRelatedDate(newYear, newMonth),
    })
  );

  if (newYear > year) {
    yield call(updateRelatedMonthSaga, true);
  }

  if (newYear < year) {
    yield call(updateRelatedMonthSaga, false);
  }
}

function* prevYearSaga() {
  yield call(updateRelatedMonthSaga, false);
}

function* nextYearSaga() {
  yield call(updateRelatedMonthSaga, true);
}

function* updateRelatedMonthSaga(isNext) {
  const { relatedMonth, relatedYear } = yield select((state) => state.date);
  const newYear = relatedMonth[0].year + (isNext ? 1 : -1);
  yield put(
    updateRelatedMonth(
      relatedMonth.map((obj) => ({
        ...obj,
        year: newYear,
      }))
    )
  );

  if (newYear > relatedYear[10]) {
    yield call(updateRelatedYearSaga, true);
  }

  if (newYear < relatedYear[1]) {
    yield call(updateRelatedYearSaga, false);
  }
}

function* prevRelatedYearSaga() {
  yield call(updateRelatedYearSaga, false);
}

function* nextRelatedYearSaga() {
  yield call(updateRelatedYearSaga, true);
}

function* updateRelatedYearSaga(isNext) {
  const { relatedYear } = yield select((state) => state.date);

  yield put(
    updateRelatedYear({
      relatedYear: relatedYear.map((num) => num + (isNext ? 10 : -10)),
    })
  );
}

function* watchSetupDate() {
  yield takeLatest(setupDate, setupDateSaga);
}

function* watchSwitchDate() {
  yield takeLatest(switchDate, switchDateSaga);
}

function* watchPrevMonth() {
  yield takeLatest(prevMonth, prevMonthSaga);
}

function* watchNextMonth() {
  yield takeLatest(nextMonth, nextMonthSaga);
}

function* watchPrevYear() {
  yield takeLatest(prevYear, prevYearSaga);
}

function* watchNextYear() {
  yield takeLatest(nextYear, nextYearSaga);
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
  watchPrevMonth(),
  watchNextMonth(),
  watchPrevYear(),
  watchNextYear(),
  watchPrevRelatedYear(),
  watchNextRelatedYear(),
];

export default all;
