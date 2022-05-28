import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    today: new Date(),
  },
  reducers: {
    updateDate(state, action) {},
  },
});

export const { updateDate } = dateSlice.actions;
export default dateSlice.reducer;
