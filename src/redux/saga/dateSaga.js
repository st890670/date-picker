import { takeLatest, put } from "redux-saga/effects";
import { setupDate, successForSetup } from "redux/slice/dateSlice";

function* setupDateSaga(action) {
  const { payload: dateTime } = action;
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const week = dateTime.getDay();
  const day = dateTime.getDate();

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
      day: dateTime.getDate(),
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
      relatedDate,
    })
  );
}

function* watchSetupDate() {
  yield takeLatest(setupDate, setupDateSaga);
}

const all = [watchSetupDate()];

export default all;
