import { createSlice } from "@reduxjs/toolkit";

const filterQuerySlice = createSlice({
  name: "filterQuery",
  initialState: "",
  reducers: {
    updateFilter(state, action) {
      state = action.payload;
      return state;
    }
  }
});

export const { updateFilter } = filterQuerySlice.actions;

export default filterQuerySlice.reducer;

