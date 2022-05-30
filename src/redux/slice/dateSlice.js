import { createSlice } from "@reduxjs/toolkit";
import { convertDateToObj } from "util/dateUtil";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    currentDate: convertDateToObj(new Date()),
    selectedDate: {
      year: 0,
      month: 0,
      week: 0,
      day: 0,
    },
    relatedDate: [],
    relatedYear: [],
  },
  reducers: {
    setupDate() {},
    successForSetup(state, action) {
      const { selectedDate, relatedDate, relatedYear } = action.payload;
      return {
        ...state,
        selectedDate,
        relatedDate,
        relatedYear,
      };
    },
    switchDate() {},
    plusDay() {},
    plusMonth() {},
    updateSelectedDate(state, action) {
      const date = action.payload;
      return {
        ...state,
        selectedDate: date,
      };
    },
  },
});

export const {
  setupDate,
  successForSetup,
  switchDate,
  plusDay,
  plusMonth,
  updateSelectedDate,
} = dateSlice.actions;
export default dateSlice.reducer;
