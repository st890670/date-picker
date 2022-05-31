import { createSlice } from "@reduxjs/toolkit";
import { convertDateToObj } from "util/dateUtil";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    currentDate: convertDateToObj(new Date()),
    selectedDate: {
      year: 0,
      month: 0,
      day: 0,
    },
    relatedDate: {
      target: { year: 0, month: 0 },
      payload: [],
    },
    relatedMonth: [],
    relatedYear: [],
  },
  reducers: {
    setupDate() {},
    successForSetup(state, action) {
      const { selectedDate, relatedDate, relatedMonth, relatedYear } =
        action.payload;
      return {
        ...state,
        selectedDate,
        relatedDate,
        relatedMonth,
        relatedYear,
      };
    },
    switchDate() {},
    prevMonth() {},
    nextMonth() {},
    updateRelatedDate(state, action) {
      const relatedDate = action.payload;
      return {
        ...state,
        relatedDate,
      };
    },
    prevYear() {},
    nextYear() {},
    updateRelatedMonth(state, action) {
      const relatedMonth = action.payload;
      return {
        ...state,
        relatedMonth,
      };
    },
    prevRelatedYear() {},
    nextRelatedYear() {},
    updateRelatedYear(state, action) {
      const { relatedYear } = action.payload;
      return {
        ...state,
        relatedYear,
      };
    },
  },
});

export const {
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
} = dateSlice.actions;
export default dateSlice.reducer;
