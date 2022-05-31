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
  updateSelectedDate,
} from "redux/slice/dateSlice";
import { convertDateToObj } from "util/dateUtil";

function* setupDateSaga(action) {
  const { payload: selectedDate } = action;
  const dateObj = convertDateToObj(selectedDate);
  const { year, month } = dateObj;
  const relatedDate = buildRelatedDate(year, month);
  const firstOfRelatedYear = Math.floor(year / 10) * 10 - 1;
  const relatedYear = new Array(12)
    .fill(0)
    .map((_, index) => firstOfRelatedYear + index);

  const relatedMonth = new Array(12)
    .fill(0)
    .map((_, index) => ({ year, month: index + 1 }));

  yield put(
    successForSetup({
      selectedDate: { ...dateObj },
      relatedDate: { target: { year, month }, payload: relatedDate },
      relatedYear,
      relatedMonth,
    })
  );
}

function buildRelatedDate(year, month) {
  const firstDayOfCurrentMonth = new Date(`${year}-${month}-01`);
  return new Array(42).fill(0).map((_, index) => {
    const diffDay = index - firstDayOfCurrentMonth.getDay();
    const targetDate = new Date(
      firstDayOfCurrentMonth.getTime() + diffDay * 24 * 60 * 60 * 1000
    );
    return convertDateToObj(targetDate);
  });
}

function* switchDateSaga(action) {
  const { payload: targetDate } = action;
  yield call(updateDate, targetDate);
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

function* prevMonthSaga() {
  yield call(updateRelatedDateSaga, false);
}

function* nextMonthSaga() {
  yield call(updateRelatedDateSaga, true);
}

function* updateRelatedDateSaga(isNext) {
  const { target } = yield select((state) => state.date.relatedDate);
  const { year, month } = target;

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
}

function* prevYearSaga() {
  yield call(updateRelatedMonthSaga, false);
}

function* nextYearSaga() {
  yield call(updateRelatedMonthSaga, true);
}

function* updateRelatedMonthSaga(isNext) {
  const relatedMonth = yield select((state) => state.date.relatedMonth);
  yield put(
    updateRelatedMonth(
      relatedMonth.map((obj) => ({
        ...obj,
        year: obj.year + (isNext ? 1 : -1),
      }))
    )
  );
}

function* prevRelatedYearSaga() {
  yield call(updateRelatedYearSage, false);
}

function* nextRelatedYearSaga() {
  yield call(updateRelatedYearSage, true);
}

function* updateRelatedYearSage(isNext) {
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
