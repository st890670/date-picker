import { createSlice } from "@reduxjs/toolkit";
import { CalendarMode } from "constant/calendar";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
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
  },
});

export const { changeMode } = calendarSlice.actions;
export default calendarSlice.reducer;
