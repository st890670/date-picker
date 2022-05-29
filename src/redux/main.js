import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import dateReduce from "redux/slice/dateSlice";
import calendarReduce from "redux/slice/calendarSlice";

import rootSaga from "redux/saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    date: dateReduce,
    calendar: calendarReduce,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
