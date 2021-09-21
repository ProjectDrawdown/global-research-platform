import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import objectPath from "object-path";
import { errorAdded } from "../util/errorSlice";
import portfolioTour from "./Toursteps";
import workbookTour from "./TourstepsWorkbook";

// We currently let the API handle assigning values to a data object or directly to a prop.
// The current implementation assumes a .value prop when there may be VMA data,
// or directly to a prop if not.
// TODO update to handle adding VMA data as well, if needed, or remove .value
// from structure altogether if VMA data is now fully extracted


const initialState = {
  tours:[{ steps:portfolioTour, completed:false, isInProgress:false },
    { steps:workbookTour, completed:false, isInProgress:false }],
  activeTour:0,
  technologies: []
};

const tourSlice = createSlice({
  name: "workbook",
  initialState,
  reducers: {
    setActiveTour,
    startTour,
    endTour,
    autoprogress
  }
});

// grey line - TAM projection (

export const {

} = tourSlice.actions;

export default tourSlice.reducer;
