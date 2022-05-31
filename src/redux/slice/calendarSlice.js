import { createSlice } from "@reduxjs/toolkit";
import { CalendarMode } from "constant/calendar";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    show: false,
    mode: CalendarMode.Date,
  },
  reducers: {
    changeMode(state, action) {
      const mode = action.payload;
      return {
        ...state,
        mode,
      };
    },
    expandCalendar(state, action) {
      return {
        ...state,
        show: action.payload,
      };
    },
  },
});

export const { changeMode, expandCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;
