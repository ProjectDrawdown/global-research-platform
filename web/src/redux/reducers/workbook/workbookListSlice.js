import { createSlice } from "@reduxjs/toolkit";
import { fetchWorkbooks } from "../../../api/api";

const initialState = [];

const workbookListSlice = createSlice({
  name: "workbooks",
  initialState,
  reducers: {
    workbookAdded(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.push(action.payload);
    },
    workbookSelected(state, action) {
      const todo = state.find(todo => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
    workbooksLoading(state, action) {
      return {
        ...state,
        status: "loading"
      };
    },
    workbooksLoaded(state, action) {
      return {
        workbooks: action.payload,
        status: "idle"
      };
    }
  }
});

export const {
  workbookAdded,
  workbookSelected,
  workbooksLoading,
  workbooksLoaded
} = workbookListSlice.actions;

export default workbookListSlice.reducer;

// Thunk function
export const fetchWorkbooksThunk = () => async dispatch => {
  dispatch(workbooksLoading());
  const response = await fetchWorkbooks();
  dispatch(workbooksLoaded(response));
};
