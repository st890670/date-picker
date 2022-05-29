import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    currentDate: {
      year: 0,
      month: 0,
      week: 0,
      day: 0,
    },
    selectedDate: {
      year: 0,
      month: 0,
      week: 0,
      day: 0,
    },
    relatedDate: [],
  },
  reducers: {
    setupDate() {},
    successForSetup(state, action) {
      const { currentDate, selectedDate, relatedDate } = action.payload;
      return {
        ...state,
        currentDate,
        selectedDate,
        relatedDate,
      };
    },
    switchDate() {},
    updateSelectedDate(state, action) {
      const date = action.payload;
      return {
        ...state,
        selectedDate: date,
      };
    },
  },
});

export const { setupDate, successForSetup, switchDate, updateSelectedDate } =
  dateSlice.actions;
export default dateSlice.reducer;
