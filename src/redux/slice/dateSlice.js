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
    relatedDate: [],
  },
  reducers: {
    setupDate() {},
    successForSetup(state, action) {
      const { currentDate, relatedDate } = action.payload;
      const { year, month, week, day } = currentDate;
      return {
        ...state,
        currentDate: {
          year,
          month,
          week,
          day,
        },
        relatedDate,
      };
    },
  },
});

export const { setupDate, successForSetup } = dateSlice.actions;
export default dateSlice.reducer;
