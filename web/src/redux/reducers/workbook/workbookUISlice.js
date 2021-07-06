import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import objectPath from "object-path";
import { errorAdded } from "redux/reducers/util/errorSlice";

const initialState = {
  activeFormRow: null
};

const workbookUISlice = createSlice({
  name: "workbookUI",
  initialState,
  extraReducers: {
  },
  reducers: {
    setActiveFormRow: (state, action) => {
      state.activeFormRow = action.payload;
    }
  }
});

export const {
  setActiveFormRow
} = workbookUISlice.actions;

export default workbookUISlice.reducer;
