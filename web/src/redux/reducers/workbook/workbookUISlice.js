import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import objectPath from "object-path";
import { errorAdded } from "redux/reducers/util/errorSlice";

const initialState = {
  activeFormRow: null,
  HelpMode:false,
  showTour:true,
};


const workbookUISlice = createSlice({
  name: "workbookUI",
  initialState,
  extraReducers: {
  },
  reducers: {
    hideshowTour: (state, action) => {
      return { ...state, showTour:false}
    },
    showHelpMode: (state, action) => {
      return { ...state, HelpMode:true}
    },
    hideHelpMode: (state, action) => {
      return { ...state, HelpMode:false}
    },
    setActiveFormRow: (state, action) => {
      state.activeFormRow = action.payload;
    }
  }
});

export const {
  setActiveFormRow,
  hideshowTour,
  showHelpMode,
  hideHelpMode,
} = workbookUISlice.actions;

export default workbookUISlice.reducer;
