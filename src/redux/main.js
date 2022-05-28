import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import dateReduce from "redux/slice/dateSlice";

import rootSaga from "redux/saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    date: dateReduce,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
